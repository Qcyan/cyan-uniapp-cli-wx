import { requestInVue } from './request/index.js';
import { toastInVue } from './toast';
import { loadingInVue } from './loading';
import { modalInVue } from './modal';
import { loginInVue } from "./login";

//import { pageInVue } from './page';
//import { locationInVue } from './location';
import { imageInVue } from './image';
import { mpUpdate } from './update';
import { shareInVue } from './share';
import { scanCodeInVue } from "./scan-code";
import { animationInVue } from "./animation";
import { uploadInVue } from './upload';
import { invoiceInVue } from './invoice';
import { webViewInVue } from './webview';
import { messageInVue } from './message';

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


  //检查更新小程序版本
  mpUpdate();
//  //页面相关
//  pageInVue(Vue);
//  //消息相关
  messageInVue(Vue);
//  //设置分享
  shareInVue(Vue);
//  //扩展 wx.getLocation
//  locationInVue(Vue);
//  //图片相关
  imageInVue(Vue);
//  //扫一扫
  scanCodeInVue(Vue);
//  //动画相关
  animationInVue(Vue);
//  //上传相关
  uploadInVue(Vue);
//  //发票
  invoiceInVue(Vue);
//  //webView相关
  webViewInVue(Vue);


}

export default mpInVue;


