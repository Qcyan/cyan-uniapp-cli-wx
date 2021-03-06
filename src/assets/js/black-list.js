import config from '@config';
import utils from 'cyan-utils';

//查询黑名单
export function blackListFilter ( opts ) {
  const {path, blackList = []} = opts;
  console.log(path);
  const homePath = config.path.home;
  for (let i = 0; i < blackList.length; i++) {
    const item = blackList[i];
    if ((typeof item.path === 'string' && item.path === path) ||
      (item.path instanceof RegExp && item.path.test(path))) {
      //匹配字符串类型
      return utils.hook(null, item.sharePath) || homePath;
    }
  }
  //没有查询到返回默认的地址
  return path;
}