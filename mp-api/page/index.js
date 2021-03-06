import config from '@config';
import store from '@store';
import utils from 'cyan-utils';
//import PageID from "./page-id";
//import { getCurrentPage, pageID } from "./index";
//import PageID from './page-id';
import { blackListFilter } from '@assets/js/black-list.js';

//页面参数
export let query = {};
//实例化页面id
//export const pageID = new PageID();

//扩展onShow设置新的page id
export function pageInVue ( Vue ) {
  Vue.mixin({
    onShow () {
//      pageID.setCurrentID();
    }
  });
}

//设置参数
export function setQuery ( pageQuery ) {
  query = pageQuery || {};
}

//获取当前页面地址链接
export function getCurrentPath () {
  const currentPage = getCurrentPages(); //小程序自带获取页面指针数组
  const lastPage = currentPage[ currentPage.length - 1 ];
  if (lastPage) {
    //获取到参数
    const query = utils.stringifyParams(lastPage.options || {});
    //微信的getCurrentPages方法的route地址首位不带/
    return `/${lastPage.route}${query ? `?${query}` : ''}`;
  }
  return config.path.home;
}

//设置最后一个路由地址
export function setLastPath (path) {
  //设置最后的路由，过滤掉地址信息
  store.commit('SET_LAST_PATH', blackListFilter({
    path,
    blackList: config.pages.lastPathBlackList
  }));
}

//回到设置的最后一个路由上
export function backLastRoute ( opts = {} ) {
  const { type } = opts;
  const url = store.state.main.lastPath;
  console.log(store.state.main,type)
  switch (type) {
    case 'launch':
      return uni.reLaunch({
        url
      });
    case 'tab':
      return uni.switchTab({
        url
      });
    case 'redirect':
      return uni.redirectTo({
        url
      });
    case 'back':
      return uni.navigateBack();
    case 'nav':
    default :
      uni.navigateTo({
        url
      });
  }
}
