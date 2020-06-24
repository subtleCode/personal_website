const env = process.env.NODE_ENV; //环境参数

let MYSQL_CONF = {
  host: "localhost",
  user: "sunyu",
  password: "123456",
  port: "3306",
  database: "blog"
}

module.exports = {
  MYSQL_CONF
}
