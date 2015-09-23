function start(response,pictures){
 console.log("start called");
 pictures.find().toArray(function(err,results){
  if(results){
   results.forEach(function(result){
   console.log(result);
   var res = JSON.stringify(result,null,4); 
   response.write(res);
   response.end();  
  }); 
  }
});
}

function upload(response,pictures){
	console.log("upload called");
}

function remove(response,pictures){
	console.log("delete called");
}


exports.start = start;

exports.upload = upload;

exports.remove = remove;
