<template>
  <view class="content">
    <scroll-view class="scroll-view"
                 scroll-y="true"
                 @scrolltolower="scrollLower"
                 :lower-threshold="loadMore.lowerThreshold">
      <div v-for="item in 30"  class="cy-pd-20rpx">
        {{item}}
      </div>


      <div v-if="loadMore.status.hasMore">
        没有更多数据
      </div>

    </scroll-view>
  </view>
</template>

<script>
  import scrollLower from '@mixin/scroll-lower';
  export default {
    mixins: [scrollLower({
      data: {
        loadMore: {
          ajax: {
            params: {
              method: 'koi_gif_list',
              id: 1
            }
          }
        }
      }
    })],
    data(){
      return {
//        lowerThreshold:50,
      }
    },
    methods:{
//      scrollLower(){
//        console.log(6666666)
//      }
    },
    onLoad() {
      this.$request({
        url: '/more/list',
        method: 'get',
        data:{
          page:1,
          type:'CN'
        },
      }).then((res) => {
        console.log(res)
      })
    }
  }
</script>

<style lang="scss" scoped >
  .scroll-view {

    /*height:rpx(300)*/
  }
</style>