const http = require("http");
const querystring = require("querystring");
const blogRouter = require("./src/router/blog.js");
const userRouter = require("./src/router/user.js");

http.createServer(function(request,response){
	// 设置返回数据类型
	response.setHeader("content-type","application/json;charset=utf-8");

	// 获取url
	const url = request.url;
  // 解析请求路径
  request.path = url.split("?")[0];
  // 解析请求参数
  request.query = querystring.parse(url.split("?")[1]);
	// 解析POST请求体
	getPostData(request).then(postData=>{
		// 将解析到的POST请求体加入request请求中
		request.body = postData;

		// 处理路由并返回的数据
		let rtnData = null;
		if( rtnData == null ){
			rtnData = blogRouter(request,response);
		}
		if( rtnData == null ){
			rtnData = userRouter(request,response);
		}
		if( rtnData != null ){
			response.end(
				JSON.stringify(rtnData)
			);
			response.end("404 Not Found");
		}
		// 未命中路由
	});
}).listen(3000,function(){
	console.log("Server is running..");
});

// 获取post请求数据
const getPostData = request => {
	const promise = new Promise((resolve,reject)=>{
		// 之处理POST请求
		if(request.method != "POST"){
			resolve({});
			return;
		}
		// POST数据类型必须是application/json
		if(request.headers["Content-Type"] === "application/json"){
			resolve({});
			return;
		}
		// 读取数据
		let postData = "";
		request.on("data",chunk=>{
			postData += chunk.toString();
		});
		request.on("end",chunk=>{
			// 数据为空，直接返回空对象
			if(!postData){
				resolve({});
				return;
			}
			// 数据不为空，将JSON解析为对象
			resolve(
				JSON.parse(postData)
			);
		});
	});
	return promise;
}
