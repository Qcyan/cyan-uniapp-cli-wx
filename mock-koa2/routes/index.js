const router = require('koa-router')()
let Mock = require('mockjs'); //引入mockjs
//console.log(Mock)
let Random = Mock.Random; //引入mock随机属性的函数

//给当前路由添加前缀(相当于/index/list)
router.prefix('/home')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!~~~'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = await Mock.mock({
    code:200,
    'arr|1-10': [{
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id': 1,
      'author|+1': Random.cname(),
      'img': Random.image('100x100'),
      'title': Random.csentence(5, 9)
    }]
  })
})

router.post('/upload_img', async (ctx, next) => {
  let upload_msg = ctx.request.body;
  console.log(upload_msg)
  ctx.body = await Mock.mock({
    code:200,
    upload_msg:upload_msg,
    message:'上传成功'
  })
})

module.exports = router
