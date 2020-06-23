// 用户相关的数据层操作

const {exec} = require("../db/mysql.js");

// 登陆
const login = (username,password) => {

  const sql = `select username,realname from user where username='${username}' and password='${password}'`;

  return exec(sql).then(userList => {
    return userList[0] || {};
  });

}

module.exports = {
  login
}
