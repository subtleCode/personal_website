
const {login} = require("../controller/user.js");
const {SuccessModule,ErrorModule} = require("../module/responseModule.js");

// 处理用户相关路由
const userRouter = (request,response) => {

  // 请求方法
  const method = request.method;
  const url = request.url;
  const path = url.split("?")[0];

  // 登陆
  if( method === "POST" && path === "/api/user/login" ){
    const {username,password} = request.body;
    if(login(username,password)){
      return new SuccessModule();
    }else{
      return new ErrorModule();
    }
  }
}

module.exports = userRouter;
