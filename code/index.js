import code from './code';
import { redirectRegister } from '$mp-api/register';
import { getCurrentPath } from "$mp-api/page";
import { clearLoginStatus , navigateToReLogin} from '$mp-api/login';
import { showToast } from '$mp-api/toast';

//错误码处理
export function codeHandler (opts){
  const {
    code: requestCode,
    message,
    reject,
    res
  } = opts;

  switch (requestCode){
    case code.REGISTER:
      //没有注册绑定手机
      return redirectRegister({
        path: getCurrentPath()
      });
      return;
    case code.EXPIRE_LOGIN:
      // 重新登录
      clearLoginStatus();
      return navigateToReLogin({
        path: getCurrentPath()
      });
      return;
    case code.MESSAGE:
      //提醒信息
      message && showToast({
        title: message
      });
      break;
  };

  reject(res.data);
}
