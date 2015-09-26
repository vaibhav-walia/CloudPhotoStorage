

function route(handle,path,request,response,pictures){

// console.log("Routing information for "+path);

 if (typeof handle[path] === 'function'){ 

  handle[path](request,response,pictures);

 }

 else{

  console.log("no handler found for path"+path);

 }

}



exports.route = route;


