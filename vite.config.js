import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VantResolver } from "@vant/auto-import-resolver"
import Components from "unplugin-vue-components/vite"
import { resolve } from 'path'

//function resolve(dir){
//  return join(__dirname,dir)
//}
// https://vitejs.dev/config/
export default ({ command, mode }) =>{
  const targetUrl = loadEnv(mode, process.cwd()).VITE_BASE_API;
  return defineConfig({
    base: "./",
    plugins: [vue(),
      Components({
        resolves: [VantResolver()],
        libs: [
          {
            libraryName: 'vant',
            esModule: true,
            resolveStyle: (name) => `../es/${name}/style`,
          },
        ],
      }),
    ],

    resolve: {
      //配置根路径别名： import('@/pages/login/login.vue')
      alias: {
        "@": resolve(__dirname, "src"), 
        // 注意一定不要随意命名，a b c这样的，项目的目录也不能为关键字保留字！！
        "comp": resolve(__dirname, "src/components"),
        // 配置图片要这样引用
        "/img": "./src/assets",
      },
      extensions: ['.js', '.vue','.json'],
    },

    build: {
      terserOptions: {
        compress: {
          //生产环境时移除console
          // drop_console: true,
          drop_debugger: true,
        },
      },
    },

    // 跨域
    server: {
      //使用IP能访问
      host: "0.0.0.0",
      port: 8000,
      // 热更新
      hmr: true,
      //设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
      strictPort: false,
      //自定义代理规则
      proxy: {
        // 选项写法
        "/api": {
          target: targetUrl,
          changeOrigin: true,
          ws: false
        },
      },
    },
  })
}