import utils from 'cyan-utils';

//获取不同类型的icon
function getIcon (type) {
  let icon = '';
  switch (type) {
    case 'success':
      icon = ``;
      break;
    case 'warn':
      icon = ``;
      break;
    case 'error':
      icon = ``;
      break;
    default :
      icon = 'none';
  }
  return icon;
}

export function showToast (opts){
  const {type} = opts;
  return new Promise(( resolve, reject ) => {
    uni.showToast(utils.extend({
      icon: getIcon(type),
      mask: true,
      success (res) {
        resolve(res);
      },
      fail (err) {
        reject(err);
      }
    },opts));
  });
}
//在vue中扩展
export function toastInVue (Vue) {
  Vue.prototype.$showToast = showToast;
}


