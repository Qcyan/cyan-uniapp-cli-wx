import config from '@config';
import utils from 'cyan-utils';

const defaultConfig = {
  confirmColor: config.css.baseColor,
  showCancel: false
};

export function showModal (opts) {
  return new Promise(( resolve, reject ) => {
    uni.showModal(utils.extend(defaultConfig, opts, {
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    }));
  });
}

export function modalInVue (Vue) {
  Vue.prototype.$showModal = showModal;
}
