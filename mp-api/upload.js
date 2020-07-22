import utils from 'cyan-utils';
import config from '@config';
import { showLoading, hideLoading } from '$mp-api/loading';
import { showToast } from '$mp-api/toast';

//选择图片,默认上传图片,isUpload为false时，将返回默认chooseImage的数据流
export function chooseImage ( opts = {} ){
  return new Promise(( resolve, reject ) => {

    const _opts = utils.extend({
      //自动上传文件
      isUpload: true
    }, opts);

    uni.chooseImage(utils.extend(_opts, {
      success ( res ) {
        //自动上传图片
        if (_opts.isUpload) {
          uploadFile({
            filePaths: res.tempFilePaths
          }).then(( res ) => {
            resolve(res);
          });
        } else {
          resolve(res);
        }
      },
      fail ( err ) {
        reject(err);
      }
    }));
  });
}

//上传图片
export function uploadFile ( opts = {
  //多个上传图片
  filePaths: []
} ){
  const all = [];
  const {filePaths} = opts;
  filePaths.forEach(( filePath ) => {
    all.push(new Promise(( resolve, reject ) => {
      showLoading();
      uni.uploadFile(utils.extend({
        //上传地址
        url: config.upload.url,
        //随机name
        name: `file`,
        header: {
          "Content-Type": "multipart/form-data",
          'accept': 'application/json',
        },
        filePath
      }, opts, {
        success ( res ) {
          if (res.statusCode == 200) {
            hideLoading();
            resolve(res);
          }else{
            showToast({
              title: "失败,图片过大",
              icon: "error",
              duration: 1500
            });
          }
        },
        fail ( err ) {
          hideLoading();
          reject(err);
        }
      }));
    }));
  });
  return Promise.all(all);
}

//扩展到Vue上
export function uploadInVue ( Vue ) {
  //获取图片文件
  Vue.prototype.$chooseImage = chooseImage;
  //上传资源
  Vue.prototype.$uploadFile = uploadFile;
}