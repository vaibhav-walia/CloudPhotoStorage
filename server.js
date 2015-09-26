
function start(port,route,handle){
        var http = require("http"),
        mongodb = require('mongodb'),
        url = require("url");
        var dbServer = new mongodb.Server('127.0.0.1',27017);
        //var photos;
new mongodb.Db('CloudPhotoStorage',dbServer).open(function(err,client){
       if(err){
          throw err;
       }
       else{
          console.log('connected to mongodb');
          var pictures = client.collection('test2');
          http.createServer(function(request,response){
          var path = url.parse(request.url).pathname;
//          console.log("request for "+path+" received");
          route(handle,path,request,response,pictures);
          response.writeHead(200,{"Content-Type":"text/plain"});
         // response.write("It Works!");
          //response.end();
          }).listen(port);
          console.log("server has started listening on port "+port);
       } 
});
}
exports.start = start;                                          
