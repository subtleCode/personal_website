var http = require("http");
http.createServer(function(request,response){
	response.statusCode = 200;
	response.setHeader("Content-Type","text/html");
	response.end("<h1>Hello world!</h1>");

}).listen(3000,function(){
	console.log("Server is running..");
});
