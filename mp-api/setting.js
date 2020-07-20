//初始授权验证
export function getSetting (){
  return new Promise(( resolve, reject ) => {
    uni.getSetting({
      success: ( res ) => {
        resolve(res);
      },
      fail ( err ) {
        reject(err);
      }
    });
  });
}