<template>
  <view>
    <view v-for="(item, index) in newsList" class="newslist">{{item}}</view>
    <view class="loading">{{loadingText}}</view>
  </view>
</template>
<script>
  var _self, page = 1, timer = null;
  export default {
    data(){
      return {
        newsList:[],
        loadingText:'加载中...'
      }
    },
    onLoad:function(){
      _self = this;
      this.getnewsList();
    },
    onPullDownRefresh:function(){
      this.getnewsList();
    },
    onReachBottom:function(){
      if(timer != null){
        clearTimeout(timer);
      }
      timer = setTimeout(function(){
        _self.getmorenews();
      }, 1000);
    },
    methods:{
      getmorenews : function(){
        if(_self.loadingText != '' && _self.loadingText != '加载更多'){
          return false;
        }
        _self.loadingText = '加载中...';
        uni.showNavigationBarLoading();
        uni.request({
          url: 'https://demo.hcoder.net/index.php?user=hcoder&pwd=hcoder&m=list1&page='+page,
          method: 'GET',
          success: function(res){
            _self.loadingText = '';
            if(res.data == null){
              uni.hideNavigationBarLoading();
              _self.loadingText = '已加载全部';
              return false;
            }
            page++;
            console.log(res);
            _self.newsList = _self.newsList.concat(res.data.split('--hcSplitor--'));
            _self.loadingText = '加载更多';
            uni.hideNavigationBarLoading();
          }
        });
      },
      getnewsList : function(){
        page = 1;
        uni.showNavigationBarLoading();
        uni.request({
          url: 'https://demo.hcoder.net/index.php?user=hcoder&pwd=hcoder&m=list1&page=1',
          method: 'GET',
          success: function(res){
            page++;
            _self.newsList = res.data.split('--hcSplitor--');
            uni.hideNavigationBarLoading();
            uni.stopPullDownRefresh();
            _self.loadingText = '加载更多';
          }
        });
      }
    }
  }
</script>
<style>
  .newslist{padding:10px; line-height:60px; font-size:28px;}
  .loading{text-align:center; line-height:80px;}
</style>