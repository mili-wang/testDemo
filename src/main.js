import { createApp } from 'vue'
import 'lib-flexible/flexible'
import App from './App.vue'
import Vant from 'vant'
import router from './router'
// 2. 引入组件样式
import 'vant/lib/index.css';

const app = createApp(App) // 创建实例

app.use(Vant) // 注册组件
app.use(router)

 
app.mount('#app')