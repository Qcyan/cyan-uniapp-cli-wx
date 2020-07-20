import utils from 'cyan-utils';

//默认的loading属性
const defaultLoadingOpts = {
  mask: true
};

export function showLoading ( opts = {} ){
//  loadingQueue.isEmpty() && uni.showLoading(utils.extend(defaultLoadingOpts, opts));
//  loadingQueue.enqueue(true);
  uni.showLoading(utils.extend(defaultLoadingOpts, opts))
};

//hide loading
export function hideLoading (){
//  loadingQueue.dequeue();
//  loadingQueue.isEmpty() && uni.hideLoading();
  uni.hideLoading();
}

export function loadingInVue (Vue){
  Vue.prototype.$showLoading = showLoading;
  Vue.prototype.$hideLoading = hideLoading;
}