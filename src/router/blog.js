// 处理“博客”相关的路由

const {getList} = require("../controller/blog.js");
const {SuccessModule,ErrorModule} = require("../module/responseModule.js");

const blogRouter = (request,response) => {

  const method = request.method;
  const path = request.path;
  const query = request.query;

  // 获取博客列表
  if( method === "GET" && path === "/api/blog/list" ){
    const data = getList(query.author,query.keyword);
    return new SuccessModule(data);
  }

  // 获取博客
  if( method === "GET" && path === "/api/blog/detail" ){
    return {
      message:"获取博客"
    }
  }

  // 新建一篇博客
  if( method === "GET" && path === "/api/blog/new" ){
    return {
      message:"新建一篇博客"
    }
  }

  // 删除一篇博客
  if( method === "GET" && path === "/api/blog/del" ){
    return {
      message:"删除一篇博客"
    }
  }

  // 更新一篇博客
  if( method === "GET" && path === "/api/blog/update" ){
    return {
      message:"更新一篇博客"
    }
  }

}
module.exports = blogRouter;
