import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入element
import ElementUI from 'element-ui'
import '@/element/theme/index.css'
Vue.use(ElementUI)
//自定义的css初始化
import '@/components/base.css'
//引入animate的css动画组件
import 'animate.css'



import APlayer from '@moefe/vue-aplayer';
Vue.use(APlayer, {
  productionTip: true,
});


import axios from "axios";

Vue.config.productionTip = false



Vue.prototype.axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')