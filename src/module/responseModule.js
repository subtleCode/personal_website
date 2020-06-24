// 响应给客户端的数据模型

// 基础模型类型
class BaseModule {

  constructor(data,message){
    // 兼容参数
    if( typeof(data) === "string"  ){
      this.message = data;
      data = null;
      message = null;
    }
    if(data){
      this.data = data;
    }
    if(message){
      this.message = message;
    }
  }
}
// 成功模型
class SuccessModule extends BaseModule {
  constructor(data,message){
    super(data,message);
    this.errno = 0;
  }
}
// 失败模型
class ErrorModule extends BaseModule {
  constructor(data,message){
    super(data,message);
    this.errno = -1;
  }
}

module.exports = {
  SuccessModule,
  ErrorModule
}
