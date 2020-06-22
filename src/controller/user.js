// 用户相关的数据层操作

// 登陆
const login = (username,password) => {
  if(username === "zhangsan" && password === "123456"){
    return true;
  }
  return false;
}

module.exports = {
  login
}
