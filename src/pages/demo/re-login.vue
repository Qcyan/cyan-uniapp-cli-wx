<template>
  <Page>
    <div class="cy-mg-b-20rpx">
      <button @click="login" class="cy-btn cy-btn-base cy-bd-radius-6 cy-w-100">
        {{reLoginStatus ? `重新登录中...` : `重新登录`}}
      </button>
    </div>
    <div v-if="!reLoginStatus">
      <navigator open-type="reLaunch" :url="config.path.home" class="cy-btn cy-btn-base cy-bd-radius-6 cy-w-100">
        回到首页
      </navigator>
    </div>
  </Page>
</template>

<script>

  import { backLastRoute } from '$mp-api/page';
  import { setIsReLoginPage } from '$mp-api/login';

  export default {
    name: "index",
    data() {
      return {
        reLoginStatus: false   //true 中登录中 false 登录失败
      };
    },
    onLoad() {
      this.login();
    },
    onUnload() {
      setIsReLoginPage(false);
    },
    methods: {
      login() {
        if (this.reLoginStatus) return;
        this.reLoginStatus = true;
        this.$login().then(() => {
          const { config, $store } = this;
          //如果是tab的路径，直接使用switchTab执行
          if (config.tabBarPath.indexOf($store.state.lastPath) !== -1) {
            //回到最后的路由页面
            backLastRoute({
              type: 'tab'
            });
          } else {
            //回到最后的路由页面
            backLastRoute({
              type: 'back'
            });
          }
        }).catch(() => {
          this.reLoginStatus = false;
        });
      }
    }
  }
</script>