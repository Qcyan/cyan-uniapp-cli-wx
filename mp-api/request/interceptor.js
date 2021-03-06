import code from '../../code/code'; //错误码
import { codeHandler } from '../../code'; //错误码处理
import { clearLoginStatus, navigateToReLogin } from '$mp-api/login';
import { showToast } from '$mp-api/toast';
import { getCurrentPath } from "$mp-api/page";

//拦截处理
export function responseInterceptor (opts) {
  const { res, resolve, reject, requestOpts } = opts;
  const { showToast: isShowToast } = requestOpts;
  //http code 处理
  if (res.statusCode === 200) {
    const { code: requestCode, msg } = res.data;
    //业务code处理
    if (requestCode === code.SUCCESS) {
      //提醒处理，默认false
      if (isShowToast) {
        showToast({
          title: msg
        }).then(() => {
          resolve(res.data);
        });
      } else {
        resolve(res.data);
      }
    } else {
      //错误码处理
      codeHandler({
        code: requestCode,
        reject,
        res
      });
    }
  }else{
    if (res.statusCode === 404) {
      showToast({
        title: '服务异常',
      });
    } else if (res.statusCode === 401) {
      clearLoginStatus();
      //跳转重新登录页面
      navigateToReLogin({
        path: getCurrentPath()
      });
    }
    reject(res.data);
  }
}
