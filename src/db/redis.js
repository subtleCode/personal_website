
const redis = require("redis");
const {REDIS_CONF} = require("../conf/db.js");

const redisClient = redis.createClient(REDIS_CONF.port,REDIS_CONF.host);

// userid失效时间（一天）
const userid_expire_time = 60*60*24;

redisClient.on("error", error => {
  console.log(error);
});

// 设置key value
function set(key,value){
  if( typeof(value) === "object" ){
    value = JSON.stringify(value);
  }
  redisClient.set(key,value,redis.print);
  redisClient.expire(key,userid_expire_time);
}

// 通过key获取value
function get(key){
  const promise = new Promise((resolve,reject) => {
    redisClient.get(key,(error,value) => {
      if(error){
        reject(error);
        return;
      }
      if(value == null){
        resolve(null);
        return;
      }
      try{
        resolve(JSON.parse(value));
      }catch(ex){
        resolve(value);
      }
    });
  });
  return promise;
}

module.exports = {
  set,
  get,
  userid_expire_time
}
