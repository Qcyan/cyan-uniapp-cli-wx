import {checkLocalLogin} from '$mp-api/login';
import config from '@config'

const store = {
  state:{
    //登录状态
    isLogin: checkLocalLogin(),

    //用户授权信息，userInfo.phone来判定是否存在手机号
    userInfo: {},

    //业务回退url，默认主页url
    lastPath: config.path.home
  },
  getters:{

  },
  mutations:{
    //设置用户信息
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    //设置用户最后访问的路径
    SET_LAST_PATH(state, path) {
      state.lastPath = path;
    },
    //设置登录状态
    SET_IS_LOGIN(state,status){
      state.isLogin = status;
    }
  },
  actions:{

  }
};
export default store;