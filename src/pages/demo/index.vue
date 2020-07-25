<template>
  <view class="content">

    <div	class="cy-pd-tb-30rpx cy-row cy-f-18rpx" v-if="!isLogin">
      <div @click="logins" class="cy-btn cy-btn-base">
        登录
      </div>
    </div>

    <div class="cy-row cy-pd-20rpx">
      <button class="cy-btn cy-btn-base" @click="invoiceTitle">
        发票抬头
      </button>
    </div>

    <div class="cy-row cy-pd-20rpx">
      <!-- 微信客服 -->
      <button open-type="contact" session-from="weapp" class="cy-btn cy-btn-base">
        客服测试
      </button>
    </div>

    <div class="cy-row cy-pd-20rpx">
      <!--调试基础库2.8.2或以上-->
      <button @click="requestSubscribeMessage" class="cy-btn cy-btn-base">
      订阅消息
      </button>
    </div>

    <div class="cy-row cy-pd-20rpx">
      <navigator url="/pages/demo/upload-img" class="cy-btn cy-btn-base">
        上传图片
      </navigator>
    </div>
    
    <div class="cy-row cy-pd-20rpx">
      <button class="cy-btn cy-btn-base" @click="saveImg">
        保存图片
      </button>
    </div>

    <div class="cy-row cy-pd-20rpx">
      <button class="cy-btn cy-btn-base" @click="scanCode">
        扫一扫
      </button>
    </div>

    <div class="cy-row cy-pd-20rpx">
      <button @click="openWebView" class="cy-btn cy-btn-base">
        webview跳外链
      </button>
    </div>

    <!-- 测试animation -->
    <div class="cy-row cy-pd-20rpx">
      <button class="cy-btn cy-btn-base" @click="toggleAction">
        测试animation || 询问层组件
      </button>
    </div>
    
    <!-- 询问层 -->
    <BvActionSheet :visible.sync="actionShow" title="BvActionSheet">
      <scroll-view scroll-y="true" style="height:500rpx;">
        <ul class="cy-reset-ul">
          <li v-for="i in list" :key="i" class="cy-pd-20rpx">
            选项{{i}}
          </li>
        </ul>
      </scroll-view>
    </BvActionSheet>

    <!-- 测试animation -->
    <div class="cy-row cy-pd-20rpx">
      <button class="cy-btn cy-btn-base" @click="toggleLayer">
        测试BvLayer组件
      </button>
    </div>

    <!-- 弹层 -->
    <BvLayer :visible.sync="layerShow">
      <div class="cy-bg-white" style="width:200rpx;height:200rpx;">
        layer 内容
      </div>
    </BvLayer>


    <div class="cy-row cy-pd-20rpx">
      <navigator url="/pages/demo/more-load" class="cy-btn cy-btn-base">
        加载更多
      </navigator>
    </div>

  </view>
</template>

<script>
  import Vuex from 'vuex';
  import BvActionSheet from '@components/BvActionSheet'
  import BvLayer from '@components/BvLayer'
  import config from '@config';

  const { mapState } = Vuex;
  export default {
    data() {
      return {
        loginStatus:true,
        title: 'Hello',
        list: [1,2,3,4,6],
        actionShow: false,
        layerShow: false,
      }
    },
    computed: {
      ...mapState(['isLogin'])
    },
    components:{
      BvActionSheet,
      BvLayer
    },
    onShareAppMessage () {
      //内部页面单独做的分享
      const share = {
        title: '首页分享',
        imageUrl: config.share.imgUrl,
        path: this.$sharePath()
//        path: this.$sharePath('/pages/demo/index?id=3')
      };
      console.log(`分享参数:`, share);
      return share;
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
          this.getData();
        });
      },
      getData(){
        console.log('获取页面初始数据')
      },

      requestSubscribeMessage(){
        const tmplIds = [
//          `mcza6vW7J8Ydza3MwI1XApOgBOAB6nB-SFV2F_u0FuY`,
//          `xP7zr-V6_jeAyH2ONzMs4lm1M0-94zuLb-PV2lxudag`,
//          `Uoj0b6tjmJ2sNjXkT204NZo29ThPjHjAurk9zp-st9c`
        ];
        this.$requestSubscribeMessage({
          tmplIds
        }).then((res) => {
          console.log(res);
        });
      },

      invoiceTitle(){
        this.$invoiceTitle().then((res) => {
          console.log(res);
        });
      },

      saveImg() {
        this.$saveImage({
          url: 'http://tmp/wx27b9d7d5baaa8687.o6zAJs4StNoF3TQRZ5K_CveFl3hc.wiVspkHW0euJb57b1517d4fdaf3f3c66e17263f0125d.jpg'
        }).then(() => {
          console.log(`saveImage`);
        });
      },

      //扫描二维码
      scanCode() {
        this.$scanCode().then((res) => {
          console.log(res);
        });
      },

      openWebView() {
        //跳外链方式
        this.$webView.navigateTo({
          src: 'https://uniapp.dcloud.io',
          title: '新闻'
        });
        uni.navigateTo({
          url: './webview'
        });
      },

      toggleAction() {
        this.actionShow = !this.actionShow;
      },
      toggleLayer() {
        this.layerShow = !this.layerShow;
      },
    }
  }
</script>

<style lang="scss" scoped >
  .content {
    text-align: center;
    /*height: rem(200);*/
    border:1px red solid
  }
</style>
