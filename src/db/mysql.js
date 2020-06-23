const mysql = require("mysql");
const { MYSQL_CONF } = require("../conf/db");

// 创建连接对象
const connection = mysql.createConnection(MYSQL_CONF);

// 开始连接
connection.connect();

// 统一执行sql的函数
function exec(sql){
  const promise = new Promise((resolve,reject)=>{
    connection.query(sql,(error,result) => {
      if(error){
        reject(error);
        return;
      }
      resolve(result);
    });
  });
}

module.exorts = {
  exec
}
