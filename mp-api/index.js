import { requestInVue } from './request/index.js';
import { toastInVue } from './toast';
import { loadingInVue } from './loading';
import { modalInVue } from './modal';
import { loginInVue } from "./login";
import './setting';


export function mpInVue ( Vue ) {
  //登录相关
  loginInVue(Vue);
  //扩展 wx.request,带上session_key处理
  requestInVue(Vue);
  //提示相关
  modalInVue(Vue);
  //弹窗相关
  toastInVue(Vue);
  //loading相关
  loadingInVue(Vue);
 
}

export default mpInVue;


