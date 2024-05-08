import axios from "axios"
import { getToken } from "./auth";
import { showSuccessToast } from 'vant';

console.log(import.meta, import.meta.env.VITE_BASE_API);
// 创建axios实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
//   baseURL: '/', // 设置默认的 API 地址，url = baseURL + url（使用proxy代理时此处可不写）
  timeout: 5000,						  // 设置请求超时时间
  headers: { 'systemType': 'IOS' }        // 设置请求header，可以自定义属性
})

// 请求拦截器
instance.interceptors.request.use(
  // 请求配置（全局），一般在登录时后端返回token，此处设置token后，前端每次调取接口都会携带token
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  // 请求错误
  (error) => {
    return Promise.reject(error)
  }
)
// 响应拦截器
instance.interceptors.response.use(
  // 响应数据，2xx 范围内的状态码都会触发该函数。
  (response) => {
    const { status, data } = response;
    if (status === 200) {
      const { code, message } = data;
      // 根据后端返回的自定义状态码 code 进行错误信息提示（根据具体需求确定是否需要书写）
      switch (code) {
        case 1001:
            showSuccessToast({ message: '登录信息已过期，请重新登录！', type: 'error' })
          return Promise.reject(data);
        case 1002:
            showSuccessToast({ message: '当前账号已在其它端登录，请重试！', type: 'error' })
          return Promise.reject(data);
        case 1003:
            showSuccessToast({ message: message || '未知错误', type: 'error' })
          return Promise.reject(data);
        default:
          return data;
      }
    }
  },
  // 响应错误，超出 2xx 范围的状态码都会触发该函数。
  (error) => {
    if (error.response) {
      // 请求已发送，收到响应，但状态码非 2xx ，根据 http 状态码来判断响应错误信息
      const { status, data } = error.response;
      if (status === 2001) {
        showSuccessToast({ message: '没查到对应数据！', type: 'error' })
      } else if (status === 2002) {
        showSuccessToast({ message: '服务器开小差了！', type: 'error' })
      } else {
        showSuccessToast({ message: data.message || '未知错误！', type: 'error' })
      }
    } else if (error.request) {
      // 请求已发送，未收到响应
      showSuccessToast({ message: error.message || '请求已发送，未收到响应信息！', type: 'error' })
    } else {
      // 其他错误
      showSuccessToast({ message: error.message, type: 'error' })
    }
    // 若简写，上面代码可省略，只写此一行
    return Promise.reject(error);
  }
)

export default instance;