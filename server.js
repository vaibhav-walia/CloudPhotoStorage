function start(port,route,handle){
	var http = require("http");
	var url = require("url");
        var mongoClient = require('mongodb').MongoClient;

	http.createServer(function(request,response){
		var path = url.parse(request.url).pathname;
		console.log("request for "+path+" received");
		route(handle,path);
		response.writeHead(200,{"Content-Type":"text/plain"});
		response.write("It Works!");
		response.end();
	}).listen(port);
	console.log("server has started listening on port "+port);
}

exports.start = start;
