// 处理“博客”相关的路由

const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require("../controller/blog.js");
const {SuccessModule,ErrorModule} = require("../module/responseModule.js");


// 登陆验证
const check = request => {
  if(!request.session.username){
    return Promise.resolve(new ErrorModule("尚未登陆"));
  }
}

const blogRouter = (request,response) => {

  const method = request.method;
  const path = request.path;
  const query = request.query;
  const body = request.body;

  // 获取博客列表
  if( method === "GET" && path === "/api/blog/list" ){
    const {author="",keyword=""} = query;
    const result = getList(author,keyword)
    return result.then(data=>{
      return new SuccessModule(data);
    });
  }

  // 获取博客
  if( method === "GET" && path === "/api/blog/detail" ){
    const result = getDetail(query.id);
    return result.then(data => {
      return new SuccessModule(data);
    });
  }

  // 新建一篇博客
  if( method === "POST" && path === "/api/blog/new" ){

    // 登陆验证
    const checkResult = check(request);
    if(checkResult){
      return checkResult;
    }

    // 新建博客的操作
    const result = newBlog(body);
    return result.then(data => {
      return new SuccessModule(data.insertId);
    });
  }

  // 更新一篇博客
  if( method === "POST" && path === "/api/blog/update" ){

    // 登陆验证
    const checkResult = check(request);
    if(checkResult){
      return checkResult;
    }

    // 更新博客的操作
    const result = updateBlog(body);
    return result.then(flag=>{
      if(flag){
        return new SuccessModule();
      }else{
        return new ErrorModule();
      }
    });
  }

  // 删除一篇博客
  if( method === "POST" && path === "/api/blog/delete" ){

    // 登陆验证
    const checkResult = check(request);
    if(checkResult){
      return checkResult;
    }

    // 删除博客的操作
    const {id,author} = body;
    const result = deleteBlog(id,author);
    return result.then(flag => {
      if(flag){
        return new SuccessModule();
      }else{
        return new ErrorModule();
      }
    });
  }
}
module.exports = blogRouter;
