const env = process.env.PROJECT_ENV;
//环境地址
const path = (() => {
  switch (env) {
    case 'base':
      //beta环境path
      return {};
    case 'prod':
      //生产环境path
      return {
        static: ``,
        home: `/pages/demo/index`
      };
    default:
      //测试环境path
      return {
        static: ``,
        home: `/pages/demo/index`,
        register: `/pages/demo/register`
      };
  }
})();

export default path;
