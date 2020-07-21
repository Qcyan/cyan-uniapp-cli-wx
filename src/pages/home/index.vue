<template>
  <view class="content">
    <div	class="cy-pd-tb-30rpx cy-row cy-f-18rpx" v-if="!isLogin">
      <div @click="logins" class="cy-btn cy-btn-base">
        登录
      </div>
    </div>
  </view>
</template>

<script>
  const { mapState } = Vuex;
  export default {
    data() {
      return {
        loginStatus:true,
        title: 'Hello'
      }
    },
    computed: {
      ...mapState(['isLogin'])
    },
    onLoad() {
      this.$request({
        url: '/home/string',
        method: 'get',
      }).then((res) => {
        console.log(res.arr)
      })

//      uni.request({
//        url: 'http://192.168.188.133:3000/home/string',
//        method: 'GET',
//        data: {},
//        success: res => {
//          console.log(res.data.arr)
//        },
//        fail: () => {},
//        complete: () => {}
//      });
    },
    methods: {
      logins(){
        this.$login().then(() => {
//          this.getData();
        });
      },
      getData(){
      }
    }
  }
</script>

<style lang="scss" scoped >
  .content {
    text-align: center;
    height: rem(200);
    border:1px red solid
  }
</style>
