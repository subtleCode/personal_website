// 处理“博客”相关的路由

const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require("../controller/blog.js");
const {SuccessModule,ErrorModule} = require("../module/responseModule.js");


const blogRouter = (request,response) => {

  const method = request.method;
  const path = request.path;
  const query = request.query;

  // 获取博客列表
  if( method === "GET" && path === "/api/blog/list" ){
    return new SuccessModule(getList(query.author,query.keyword));
  }

  // 获取博客
  if( method === "GET" && path === "/api/blog/detail" ){
    return new SuccessModule(getDetail(1));
  }

  // 新建一篇博客
  if( method === "POST" && path === "/api/blog/new" ){
    return new SuccessModule(newBlog(request.body));
  }

  // 更新一篇博客
  if( method === "POST" && path === "/api/blog/update" ){
    if(updateBlog(request.body)){
      return new SuccessModule();
    }else{
      return new ErrorModule();
    }
  }

  // 删除一篇博客
  if( method === "POST" && path === "/api/blog/del" ){
    if(deleteBlog(request.body.id)){
      return new SuccessModule();
    }else{
      return new ErrorModule();
    }
  }

}
module.exports = blogRouter;
