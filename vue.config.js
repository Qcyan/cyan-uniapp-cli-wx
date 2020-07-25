const path = require('path');
const utils = require('blue-utils');
const publicVueConfig = require('./vue-config');
//require('./components-dir');


function resolve(dir) {
  return path.join(__dirname, dir);
}

const config = utils.extend(publicVueConfig, {
  configureWebpack: {
    devtool: '#source-map',
    resolve: {
      alias: {
        /*@开头都是本项目内的*/
        '@': resolve('src'),
        '@store': resolve('src/store'),
        '@config': resolve('src/config'),
        '@assets': resolve('src/assets'),
        '@css': resolve('src/assets/css'),
        '@static': resolve('static'),
        '@components': resolve('src/components'),
        '@mixin': resolve('src/mixin'),
//        '$components': resolve(`src/components`)
      }
    }
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@css/cyan-css/main/base.scss";`
      }
    }
  }
});

module.exports = config;
