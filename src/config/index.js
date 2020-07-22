import utils from 'cyan-utils';
import path from './path';

const config = {
  app: {
    name: "cyan-uniapp-wx",               //小程序名
    appid: "wx778c970d29ab7fad"                 //appid
  },
  //域名url相关
  url: {
    base: `http://192.168.188.133:3000`,
//    base: `http://192.168.43.96:3000`,
    static: ``
  },
  //路径相关
  //路径相关
  path: {
    home: "/pages/demo/index",       //首页地址
    webview: "/pages/webview/index",
    reLogin: "/pages/demo/re-login",
    register:'/pages/demo/register'
  },

  //底部地址信息，暂时用于relogin的时候的回跳处理
  tabBarPath: [],

  pages: {
    //设置最后的路由黑名单配置
    lastPathBlackList: [{
//      path: /register|bind-phone/
    }]
  },
  //登录相关
  login: {
    request: {
      url () {
        return `/users/login`;
      },
      method: 'post',
      //登录获取的状态
      data () {
        return {};
      },
      //登录获取的状态
      params ( res ) {
        return {
          appid: config.app.appid,
          code: res.code
        };
      },
    },
    hooks: {
      got (data) {
        return data;
      },
      //登录成功
      success () {
      }
    },
    //登录状态
    storage: {
      [`token`]: "token"
    }
  },
  //用户信息
  userInfo: {
    request: {
      url: `/users/getUserInfo`,
      params ( res) {
        return res;
      }
    },
    hooks: {
      got ( data) {
        return data;
      }
    }
  },

  css: {
    //基色
    baseColor: "#0f8cca"
  },

  //分享相关
  share: {
    title: "blue-wx-mini-program",
    deps: "blue-wx-mini-program is vue public template",
    imgUrl: "",
    params: {
      phone: 'n'
    },
    blackList: [{
//      path: /register|bind-phone/
    }]
  },

  //定位相关
  location: {
    //存储的key
    storageKey: `location`
  },

  //上传成功
  upload: {
    //上传地址
    url: `http://192.168.188.133:3000/home/upload_img`
  },

  request: {
    options: {
      data: {},
      method: "GET",
      dataType: "json",
      responseType: "text",
      ['content-type']: 'application/x-www-form-urlencoded',
      //是否显示
      showLoading: true,
      showToast: false,
      checkPageID: true,
      tips: {
        loading: '数据加载中',
        fail: '连接错误',
        timeout: `请求超时`
      }
    }
  }

};

export default config;