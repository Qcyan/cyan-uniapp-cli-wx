import utils from 'cyan-utils';
import { hideLoading, showLoading } from "$mp-api/loading";
import { showToast } from "$mp-api/toast";
import { authorizeFail } from "$mp-api/authorize";

export function messageInVue ( Vue ) {
  //授权订阅消息订阅
  Vue.prototype.$requestSubscribeMessage = requestSubscribeMessage;
}

//授权订阅消息订阅
export function requestSubscribeMessage (opts){
  const { tmplIds } = opts;
  return new Promise(( resolve, reject ) => {
    showLoading();
    // @ts-ignore
    uni.requestSubscribeMessage(utils.extend(opts, {
      success ( res ) {
        hideLoading();
        resolve(checkSubscribeMessageByTmplIds({
          subscriptionsSetting: res,
          tmplIds
        }));
      },
      fail ( err ) {
        hideLoading();
        //订阅消息错误处理
        subscribeMessageErrHandler({
          err,
          reject
        });
      }
    }));
  });
}

//订阅消息提醒
const subscribeMessageTips = {
  request: `网络问题，请稍后重试`,
  default: `订阅消息异常`
};

//订阅消息错误处理
function subscribeMessageErrHandler ( opts ) {
  const { err, reject } = opts;
  const { errCode, errMsg } = err;
  const defaultErrTips = `${subscribeMessageTips.default}:${errCode}`;
  switch (errCode) {
    case 10001:
      showToast({
        title: 'error,tmplIds数组没有值'
      });
      break;
    case 10002:
    case 10003:
      showToast({
        title: subscribeMessageTips.request
      });
      break;
    case 20001:
      showToast({
        title: defaultErrTips
      });
      break;
    case 20004:
      return authorizeFail({
        type: `subscribeMessage`
      });
    case 20005:
      showToast({
        title: defaultErrTips
      });
      break;
    default:
      showToast({
        title: errMsg
      });
      reject(err);
  }
}

/*
* accept reject ban状态
* 如果未授权=>false
* 模板id匹配到不授权=>false
* 检查对于订阅ids的有效性
* */
function checkSubscribeMessageByTmplIds ( opts) {
  const { tmplIds, subscriptionsSetting } = opts;
  if (tmplIds.length === 0) return 'cancel';
  const reject = [];
  const accept = [];
  tmplIds.forEach(( id ) => {
    if (subscriptionsSetting[ id ] === 'accept') {
      //收集成功
      accept.push(id);
    } else {
      //收集错误
      reject.push(id);
    }
  });

  const status = (() => {
    //取消授权
    if (reject.length === tmplIds.length) return 'cancel';
    //全部授权
    else if (reject.length === 0) return 'accept';
    //部分授权
    return 'some';
  })();

  return {
    //状态 cancel, accept, some
    status,
    //收集
    accept,
    reject,
    //requestSubscribeMessage res数据
    ...subscriptionsSetting
  };
}
