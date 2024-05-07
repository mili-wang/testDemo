import { createApp } from 'vue'
import 'lib-flexible/flexible'
import App from './App.vue'
import { Button } from 'vant'
import { Icon } from 'vant'
import { Swipe, SwipeItem } from 'vant'
import router from './router'
// 2. 引入组件样式
import 'vant/lib/index.css';
//import 'vant/lib/index.css'; // 全局引入样式

const app = createApp(App) // 创建实例

app.use(Button).use(Icon).use(Swipe).use(SwipeItem) // 注册组件
app.use(router)

 
app.mount('#app')