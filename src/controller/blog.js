// 处理blog相关的业务逻辑

// exec函数范围直是promise对象
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
  const sql = `select * from blog where id='${id}'`;
  return exec(sql).then(rows =>{
    return rows[0];
  });
  return exec(sql);
}

// 新建一篇博客
const newBlog = (blog) => {

  const {title="",content="",author=""} = blog;
  const createtime = Date.now();
  const sql = `insert into blog(title,content,author,createtime)
  values('${title}','${content}','${author}',${createtime})`;
  return exec(sql);
}

// 更新博客
const updateBlog = (blog) => {
  const {id,title,content} = blog;
  const sql = `update blog set title='${title}',content='${content}' where id=${id}`;
  return exec(sql).then(updateData => {
    if(updateData.affectedRows > 0){
      return true;
    }else{
      return false;
    }
  });
}

// 删除博客
const deleteBlog = (id,author) => {
  const sql = `delete from blog where id = ${id} and author='${author}'`;
  return exec(sql).then(delData =>{
    // 返回布尔值，表示成功与失败
    if(delData.affectedRows > 0){
      return true;
    }else{
      return false;
    }
  });
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}
