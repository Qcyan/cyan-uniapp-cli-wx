import config from '@config';
import $request from '$mp-api/request';
import utils from 'cyan-utils';

export function apiLogin ( opts ){
  const login = config.login;
  const loginRequest = login.request;  //请求地址
  const {data, url} = opts;
  return $request({
    url: url || utils.hook(null, loginRequest.url) || '',
    method: loginRequest.method,
//    baseUrl: loginRequest.baseUrl,
    data,
    tips: {
      loading: '登录中',
      timeout: '登录超时'
    }
  });
}
