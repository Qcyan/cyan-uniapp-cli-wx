import config from '@config';
import utils from 'cyan-utils';
import store from '@store';
import { apiLogin } from '../api';
import { setUserInfo } from './user-info';
import { hideLoading, showLoading } from './loading';
import { redirectRegister } from './register';
import { showModal } from './modal';

//扩展到Vue中
export function loginInVue (Vue){
  Vue.prototype.$login = login;
}

//检查是否登录了,检查login的配置中在storage中是否存在
export function checkLocalLogin (){
  const keys = Object.keys(config.login.storage);
//  let key = 0;
  let len = 0;
//  for(key in config.login.storage){
//    if (uni.getStorageSync(key)) ++len;
//  }
  utils.each(config.login.storage, ( key, _key) => {
    if (uni.getStorageSync(_key)) ++len;
  });
  return keys.length === len;
}

//检查登录状态是否在有效期内
function checkSession(){
  return new Promise((resolve,reject)=>{
    uni.checkSession({
      success () {
        resolve();
      },
      fail () {
        reject();
      }
    })
  })
}

//清空在storage的登录状态
export function clearLoginStatus () {
  //清空所有的存储
  utils.each(config.login.storage, ( key, _key ) => {
    uni.removeStorageSync(_key);
  });
  //重新设置登录状态
  store.commit('SET_IS_LOGIN', false);
}
//设置指定的登录态到storage
export function setLoginStorage (data) {
  const gotData = utils.hook(null, config.login.hooks.got, [data]);
  console.log(gotData,588);
  utils.each(config.login.storage, ( key, _key ) => {
    if (key in gotData) {
      uni.setStorageSync(_key, gotData[ key ]);
    }
  });
}

//提醒重新重新登录
function showLoginModal ( opts ){
  const { resolve, reject } = opts;
  return showModal({
    content: '登录失败',
    showCancel: true,
    confirmText: '重新登录'
  }).then(( res ) => {
    if (res.confirm === true) {
      login().then(( res ) => {
        resolve(res);
      });
    } else if (res.cancel === true) {
      //清空请求的队列
      reject();
    }
  });
}


//小程序登录
function mpLogin (){
  return new Promise(( resolve, reject ) => {
    console.log('nui.login~')
    uni.login({
      //微信的授权timeout
      timeout: 5000,
      //打开就授权支付宝主动授权
      // @ts-ignore
      scopes: `auth_base`,
      success ( res ) {
        resolve(res);
        console.log(res)
      },
      fail ( err ) {
        reject(err);
      }
    });
  });
}

//wx login 走微信小程序登录流程
export function login (){
  return new Promise((resolve,reject)=>{
    showLoading({
      title:'登录中'
    });
    //检查是否登录了,检查login的配置中在storage中是否存在
    if(checkLocalLogin()){
      hideLoading();
      //检查登录状态是否在有效期内
      checkSession().then(()=>{
        resolve(); //有效期内不进行任何处理
      }).catch(()=>{
        clearLoginStatus(); //在storage清空登录的状态
        //重新走登录
        login().then((res) => {
          resolve(res);
        });
      })
    }else{
      //微信登录
      mpLogin().then((res)=>{
        hideLoading();
        //login success
        if (!/ok/g.test(res.errMsg)) {
          //登录失败，提醒重新登录
          return showLoginModal({
            resolve,
            reject
          });
        }
        //发送login code,获取openid
        sendLoginCode({
          data: res || {}
//          data: config.login.request.data.apply(null,[res]) || {}
        }).then(() => {
          // 设置登录状态
          resolve();
        }).catch((err)=>{
          //登录失败，提醒重新登录
          showLoginModal({
            resolve,
            reject
          });
        })
      })
    }
  })
}

//获取openid
function sendLoginCode(opts){
  return apiLogin(opts).then((res)=>{
    const { data } = res;
    if (res.errcode === 50001) {
      //新用户，前往注册
      redirectRegister();
    } else {
      //设置登录信息到storage中
      setLoginStorage(data);
      //设置用户信息
      setUserInfo(data);
      //调用成功后的钩子
      utils.hook(null, config.login.hooks.success, [data]);
    }
    return res;
  })
}


//是否为重登页面
export let isReLoginPage = false;
//设置是否重登的状态
export function setIsReLoginPage (status) {
  isReLoginPage = status;
}
//跳转重登页面
export function navigateToReLogin ( opts = {} ) {
  //避免
  if (isReLoginPage) return;
  //设置是否重登的状态
  setIsReLoginPage(true);
  //设置最后的路由地址
  setLastPath(opts.path);
  //清空登录态
  clearLoginStatus();
  //跳转绑定手机页面
  uni.navigateTo({
    url: config.path.reLogin
  });
}

