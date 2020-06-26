
const {login} = require("../controller/user.js");
const {SuccessModule,ErrorModule} = require("../module/responseModule.js");
const {set,setExpire} = require("../db/redis.js");

// 处理用户相关路由
const userRouter = (request,response) => {

  // 请求方法
  const method = request.method;
  const url = request.url;
  const path = url.split("?")[0];


  // 登陆
  if( method === "GET" && path === "/api/user/login" ){
    const {username,password} = request.query;
    const result = login(username,password);
    return result.then(user => {
      // 登陆成功
      if(user.username){
        // 设置session
        request.session.username = user.username;
        request.session.realname = user.realname;
        // 同步到redis
        set(request.sessionId,request.session)
        // 设置过期时间
        // setExpire(request.sessionId,request.cookie.expires);
        console.log(request.cookie);

        return new SuccessModule();
      }
      // 登陆失败
      return new ErrorModule();
    });
  }

  // 登陆验证
  if(method === "GET" && path === "/api/user/check"){
    if(request.cookie.username){
      return Promise.resolve(new SuccessModule());
    }else{
      return Promise.resolve(new ErrorModule());
    }
  }

}

module.exports = userRouter;
