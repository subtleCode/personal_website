
const {login} = require("../controller/user.js");
const {SuccessModule,ErrorModule} = require("../module/responseModule.js");

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
      if(user.username){
        // 为响应对象绑定cookie
        response.setHeader("Set-Cookie",`username=${user.username}; path=/; httponly`);
        return new SuccessModule();
      }else{
        return new ErrorModule();
      }
    });
  }


  if(method === "GET" && path === "/api/user/check"){
    if(request.cookie.username){
      return Promise.resolve(new SuccessModule());
    }else{
      return Promise.resolve(new ErrorModule());
    }
  }

}

module.exports = userRouter;
