import utils from 'cyan-utils';
import config from '@config';
import { hideLoading, showLoading } from '$mp-api/loading';
import { showToast } from '$mp-api/toast';
//import { pageID } from '$mp-api/page';
//拦截处理
import { responseInterceptor } from './interceptor';

//在vue扩展
export function requestInVue (Vue){
  //扩展 wx.request,带上登录态处理
  Vue.prototype.$request = request;
}

//设置login header
function setRequestHeader(){
  const header = {};
  let obj = config.login.storage;
  let i = 0;
  // 获取登录code放入header
  for (i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    header[ i ] = uni.getStorageSync(i);
  }
//  utils.each(config.login.storage, ( key, _key ) => {
//    header[ _key ] = uni.getStorageSync(_key);
//  });
  return header;
}



//请求扩展
function setExtend (opts){
  //原始的url
  opts.rawUrl = opts.url;
  //合并域名
  opts.url = `${opts.baseUrl || config.url.base || ''}${opts.url}`;
  return utils.extend(config.request.options, {
    header: setRequestHeader(),
  }, opts);
}


//request 请求封装
export default function request(requestOpts){
  //所有请求信息
  requestOpts = setExtend(requestOpts);
  const { tips, showLoading: _showLoading } = requestOpts;
  //request loading的处理
  _showLoading && showLoading({
    title: tips.loading
  });


  return new Promise((resolve,reject)=>{
    uni.request(utils.extend(requestOpts,{
      success: (res) => {
        //关闭loading
        _showLoading && hideLoading();
        //拦截器
        responseInterceptor({
          res,
          resolve,
          reject,
          requestOpts
        });
      },
      fail: (err) => {
        //关闭loading
        _showLoading && hideLoading();
        //选取提醒信息
        let msg = tips.fail;
        //超时提醒
        if (err && /timeout/.test(err.errMsg)) {
          msg = tips.timeout;
        }
        showToast({
          title: msg
        });
        reject(err);
      }
    }))
  })
  
  
}
