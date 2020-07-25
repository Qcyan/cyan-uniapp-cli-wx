const router = require('koa-router')();
let Mock = require('mockjs') //引入mockjs

router.prefix('/more');

const List = [];
const count = 100;
const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>';
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3';

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    author: '@first',
    reviewer: '@first',
    title: '@title(5, 10)',
    content_short: 'mock data',
    content: baseContent,
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['published', 'draft', 'deleted'],
    display_time: '@datetime',
    comment_disabled: true,
    pageviews: '@integer(300, 5000)',
    image_uri,
    platforms: ['a-platform']
  }))
}

router.get('/list', async (ctx, next)=>{
  console.log(ctx.query)
  const {  page = 1, limit = 10, sort , type} = ctx.query;

  //筛选出符合条件的列表
  let mockList = List.filter(item => {
    if (type && item.type !== type) return false
    return true
  })

  //取出当前页的数据列表
  const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

  if (sort === '-1') {
    mockList = mockList.reverse()
  }

  ctx.body = await Mock.mock({
    code: 200,
    data: {
      total: mockList.length,
      list: pageList,
    }
  })
})

module.exports = router

