// 处理blog相关的业务逻辑

const {exec} = require("../db/mysql.js");


// 根据作者与关键字返回数据
const getList = (author,keyword) => {
  let sql = `select * from blog where 1=1 `;
  if(author){
    sql += `and author='${author}' `;
  }
  if(keyword){
    sql += `and title like '%${keyword}%' `;
  }
  sql += `order by createtime desc;`;
  return exec(sql);
}

// 根据ID号查询博客文
const getDetail = (id) => {
  return {
          id: 1,
          title: "标题A",
          content: "内容A",
          author: "zhanshan",
          createTime: 111
      };
}

// 新建一篇博客
const newBlog = (blog) => {
  // 返回新建博客的id号,以表示博客新建成功
  return {
    id:3
  }
}

// 更新博客
const updateBlog = (blog) => {
  // 返回true或false以表示成功与失败
  return true;
}

// 删除博客
const deleteBlog = (id) => {
  // 返回布尔值，表示成功与失败
  return true;
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}
