
// 处理用户相关路由
const userRouter = (request,response) => {

  // 请求方法
  const method = request.method;
  const url = request.url;
  const path = url.split("?")[0];

  // 登陆
  if( method === "POST" && path === "/api/user/login" ){
    return {
      message:"登陆请求"
    }
  }

}

module.exports = userRouter;
