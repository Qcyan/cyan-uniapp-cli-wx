import Vue from 'vue'
import App from './App'
import store from './store'

//use public in vue
import useInVue from '../use-in-vue';

//全局的组件
import BvLayer from '@components/BvLayer'
//注册全局的组件
Vue.component('BvLayer', BvLayer);


//使用插件到Vue，相对于公共的插件
useInVue(Vue);
Vue.config.productionTip = false

Vue.prototype.$store = store;
console.log(store)

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
