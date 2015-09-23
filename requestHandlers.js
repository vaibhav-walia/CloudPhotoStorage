

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

    console.log(files);

    if(files.upload.size >0){

    var path = files.upload.path;

    var filename = files.upload.name;

    fs.readFile(path,function(err,data){

    if(err) throw err;

    var base64data = new Buffer(data).toString('base64');

    var toInsert = {filename : base64data};

    pictures.insert(toInsert);

  });

  }



 });

response.writeHead({"Content-Type":"text/html"});

response.end("<html><body><b> Data Received</b> <form action='/show'><input type ='submit' value='Ok' /></form> <img src=/show /></body></html>");       

}



function remove(request,response,pictures){

	console.log("delete called");

}



function show(request,response,pictures){

 pictures.find().toArray(function(err,picture){

response.writeHead({"Content-Type":"text/html"});

var body = "<html><body>";

var images = "";

picture.forEach(function(pic){

 var imageStr = JSON.stringify(pic.filename);

 var i = "<img src=data:image/*;base64,"+pic.filename+" />";

 images = i + images ;

});

body = body+images+"</body></html>";

 response.end(body);

});

}



exports.start = start;

exports.upload = upload;

exports.remove = remove;

exports.show = show;


