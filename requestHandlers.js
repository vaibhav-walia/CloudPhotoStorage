var fs = require("fs"),
formidable = require("formidable");

function start(request,response,pictures){
// console.log("start called");
 pictures.find().toArray(function(err,results){

  if(results){
  // results.forEach(function(result){
   response.writeHead(200, {"Content-Type": "text/html"}); 

   var body = '<html>'+
  '<head>'+
  '<meta http-equiv="Content-Type" '+
  'content="text/html; charset=UTF-8" />'+
  '</head>'+
  '<body>'+
  '<form action="/upload?album="album2"" enctype="multipart/form-data" '+
  'method="post">'+
  '<input type="file" name="upload" multiple="multiple">'+
  '<input type="submit" value="Upload file" />'+
  '</form>'+
  '</body>'+
  '</html>'; 

  response.end(body);  
 // }); 
  }
});
}

function upload(request,response,pictures){
 var url = require("url");
 var querystring = require('querystring');
 var query = url.parse(request.url).query;
 var album = querystring.parse(response.url)["album"];
 if(!album) album = 'album1';
 var form = new formidable.IncomingForm();
 form.parse(request,function(error,fields,files){
   if(error) throw error;
    if(files.upload.size){
    var path = files.upload.path;
    var filename = files.upload.name;
    fs.readFile(path,function(err,data){
     if(err) throw err;
     var base64data = new Buffer(data).toString('base64');
     pictures.find({album : album}).toArray(function(err,data){
     console.log("Error : "+err);
     console.log("Album :"+data);
     if(!data || data.length<1){
      var toInsert = {
                     album : album,
                     pictures : [{base64Img : base64data,filename : filename}],
                    };
       console.log(toInsert);
       pictures.insert(toInsert,function(err,data){
       response.writeHead({"Content-Type":"text/html"});
       response.end("<html><body><b> Data Received</b> <form action='/show'><input type ='submit' value='Ok' /></form> </body></html>");
      });
     }
     else{
         console.log(data[0]);
         var pics = data[0].pictures;
         pics.push({base64Img : base64data,filename : filename});
         pictures.update({ album : album },{album:album,pictures:pics},function(err,data){
         if(err) throw err;
         console.log(data);
         response.writeHead({"Content-Type":"text/html"});
         response.end("<html><body><b> Data Received</b> <form action='/show'><input type ='submit' value='Ok' /></form> </body></html>");
         });
    }  
    });
    /*
     var toInsert = {
                     album : album,
                     pictures : [],
                     Base64Img : base64data,
                     filename : filename
                    };
     console.log(toInsert);
     pictures.insert(toInsert,function(err,data){
      response.writeHead({"Content-Type":"text/html"});
      response.end("<html><body><b> Data Received</b> <form action='/show'><input type ='submit' value='Ok' /></form> </body></html>");     
     });*/
    });
   }
   else{
    response.writeHead({"Content-Type":"text/html"});
    response.end("<html><body><b> No Data Received</b> <form action='/'><input type ='submit' value='Ok' /></form> </body></html>");
   }
 });

      
}

function remove(request,response,pictures){
//	console.log("delete called");
 response.end();

}

function show(request,response,pictures){
 var url = require("url");
 var querystring = require('querystring');
 var query = url.parse(request.url).query;
 var album = querystring.parse(response.url)["album"];
 //var filename = querystring.parse(i
 if(!album) album = 'album1';
 pictures.find({album : album}).toArray(function(err,albums){
 console.log(albums);
 console.log("picture:"+albums[0].pictures);
 response.writeHead({"Content-Type":"text/html"});
 var body = "<html><body>";
 var images = "";
 var pictures = albums[0].pictures; 
pictures.forEach(function(pic){
  //var imageStr = JSON.stringify(pic.filename);
  var i = "<img src=data:image/*;base64,"+pic.base64Img+" /><br>";
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
