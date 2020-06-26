const env = process.env.NODE_ENV; //环境参数

let MYSQL_CONF = {
  host: "localhost",
  user: "sunyu",
  password: "123456",
  port: "3306",
  database: "blog"
}

let REDIS_CONF = {
  host: "localhost",
  port: "6379"
}


module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}
