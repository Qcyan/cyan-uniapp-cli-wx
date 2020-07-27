<template>
  <view>
    <view v-for="(item, index) in newsList" class="newslist">{{item.author}}</view>
    <view class="loading">{{loadingText}}</view>
  </view>
</template>

<script>
  var timer = null;
  export default {
    data(){
      return {
        newsList:[],
        loadingText:'加载中...',
        loadOpts:{
          page:1,
        }
      }
    },
    methods:{
      onPullDownRefresh:function(){
        this.getnewsList();
      },
      onReachBottom:function(){
        if(timer != null){
          clearTimeout(timer);
        }
        timer = setTimeout(function(){
          this.getmorenews();
        }.bind(this), 1000);
      },
      getmorenews(){
        if(this.loadingText != '' && this.loadingText != '加载更多'){
          return false;
        };
        this.loadingText = '加载中...';
        uni.showNavigationBarLoading();
        this.$request({
          url: '/more/list',
          method: 'get',
          data:{
            page: this.loadOpts.page
          }
        }).then((res) => {
          this.loadingText = '';
          if(res.data == null){
            uni.hideNavigationBarLoading();
            this.loadingText = '已加载全部';
            return false;
          }
          this.loadOpts.page++;
          this.newsList = this.newsList.concat(res.data.list);
          this.loadingText = '加载更多';
          uni.hideNavigationBarLoading();
        })
      },
      getnewsList(opts = {}){
        this.loadOpts.page = 1;
        uni.showNavigationBarLoading();
        this.$request({
          url: '/more/list',
          method: 'get',
          data:{
            page: this.loadOpts.page
          }
        }).then((res) => {
          this.loadOpts.page++;
          this.newsList = res.data.list;
          uni.hideNavigationBarLoading();
          uni.stopPullDownRefresh();
          this.loadingText = '加载更多';
        })
      }
    },
    onLoad(){
      this.getnewsList()
    }
  }
</script>