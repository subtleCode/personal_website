const http = require("http");
const querystring = require("querystring");
const blogRouter = require("./src/router/blog.js");
const userRouter = require("./src/router/user.js");
const {set,get,userid_expire_time} = require("./src/db/redis.js");

http.createServer(function(request,response){
	// 设置返回数据类型
	response.setHeader("content-type","application/json;charset=utf-8;");

	// 获取url
	const url = request.url;
  // 解析请求路径
  request.path = url.split("?")[0];
  // 解析请求参数
  request.query = querystring.parse(url.split("?")[1]);

	// 解析cookie
	const cookieStr = request.headers.cookie || '';
	request.cookie = {};
	// 将cookie字符串转为对象
	cookieStr.split(";").forEach(item => {
		if(!item) return;
		const arr = item.split("=");
		const key = arr[0].trim();
		const value = arr[1].trim();
		request.cookie[key] = value;
	});


	// 解析 session
	let needCookie = false;
	let userid = request.cookie.userid;
	if(!userid){ // 如果cookie中没有userid
		needCookie = true; // 客户端需要绑定cookie
		userid = `${Date.now()}_${Math.random()}`; // 生成一个userid
		set(userid,{}); // 初始化redis数据库中的值
	}
	// 获取 session
	request.sessionId = userid; // 将session的id号绑定到request对象上
	get(userid).then(sessionData => {
		if(sessionData == null){ // userid在redis数据库中对应的值为空
			set(userid,{}); // 初始化userid的在redis中的值
			sessionData = {}; // 将sessionData初始化为空对象
		}
		request.session = sessionData;

		//处理post data
		return getPostData(request);
	}).then(postData=>{

		// 将解析到的POST请求体加入request请求中
		request.body = postData;
		// 处理路由并返回的数据
		let result = null;
		// 博客的路由
		if( result == null ){
			result = blogRouter(request,response);
		}
		// 用户的路由
		if( result == null ){
			result = userRouter(request,response);
		}
		// 响应结果
		if( result != null ){
			result.then(data => {
				if(needCookie){
					// 为响应对象绑定cookie
					response.setHeader("Set-Cookie",`userid=${userid}; path=/; httponly; expires=${getCookieExpires()}`);
				}
				response.end(
					JSON.stringify(data)
				);
			});
			return;
		}
		// 未命中路由
		response.end("404 Not Found");

	});
}).listen(3000,function(){
	console.log("Server is running..");
});

// 获取post请求数据
const getPostData = request => {
	const promise = new Promise((resolve,reject)=>{
		// 只处理POST请求，所以非POST请求直接结束
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
// cookie失效时间
const getCookieExpires = () => {
	const date = new Date();
	date.setTime(date.getTime() + (userid_expire_time*1000));
	return date.toGMTString();
}
