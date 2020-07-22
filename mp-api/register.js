import config from '@config';
import { setLastPath, getCurrentPath } from "./page";

//没有注册绑定手机
export function redirectRegister(){
  let path = getCurrentPath();
  //设置最后的路由地址,存入store
  setLastPath(path);
  //跳转绑定手机页面
  uni.reLaunch({
    url: '/pages/demo/register'
  });
}

//是否在绑定手机的页面
export function isRegisterPage ( path) {
  let lastPath = getCurrentPath();
  if (path) {
    lastPath = path;
  }
  return lastPath === config.path.register;
}