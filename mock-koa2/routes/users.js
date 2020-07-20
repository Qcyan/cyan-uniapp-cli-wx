const router = require('koa-router')();
let Mock = require('mockjs') //引入mockjs

router.prefix('/users')

router.post('/login', async (ctx, next)=> {
  let i = 0;
  ctx.body = await Mock.mock({
    code: 200,
    data: {
      token: 'token_value'
    },
    errcode: 50001  //模拟50001需要注册
  })
})

router.post('/setUserInfo', async (ctx, next)=>{
  ctx.body = await Mock.mock({
    code: 200,
    data: {
      username: 'cyan',
      mobile: '',
      token: 'token_value'
    },
    errcode: 40001
  })
})

router.get('/getUserInfo', async (ctx, next)=>{
  ctx.body = await Mock.mock({
    code: 200,
    data: null /*{
      username: 'cyan',
      mobile: '',
      token: 'token_value'
    }*/,
    errcode: 40001
  })
})

router.post('/bindPhone', async (ctx, next)=>{
  ctx.body = await Mock.mock({
    code: 200,
    data: {
      username: 'cyan',
      mobile: '',
      token: 'token_value'
    }
  })
})

module.exports = router
