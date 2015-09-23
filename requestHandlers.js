var fs = require("fs"),
formidable = require("formidable");

function start(request,response,pictures){
 console.log("start called");
 pictures.find().toArray(function(err,results){
  if(results){
   results.forEach(function(result){
   console.log(result);
   var res = JSON.stringify(result,null,4); 
   response.writeHead(200, {"Content-Type": "text/html"}); 
 
   var body = '<html>'+
  '<head>'+
  '<meta http-equiv="Content-Type" '+
  'content="text/html; charset=UTF-8" />'+
  '</head>'+
  '<body>'+
  '<form action="/upload" enctype="multipart/form-data" '+
  'method="post">'+
  '<input type="file" name="upload" multiple="multiple">'+
  '<input type="submit" value="Upload file" />'+
  '</form>'+
  '</body>'+
  '</html>'; 

  response.end(body);  
  }); 
  }
});
}

function upload(request,response,pictures){
 console.log("upload called");
 var form = new formidable.IncomingForm();
 form.parse(request,function(error,fields,files){
 if(error) throw error;
 console.log("parsing done");
 console.log(fields+"\n");
 console.log(files);
 });       
}

function remove(request,response,pictures){
	console.log("delete called");
}


exports.start = start;

exports.upload = upload;

exports.remove = remove;
