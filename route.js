function route(handle,path,response,pictures){
 console.log("Routing information for "+path);
 if (typeof handle[path] === 'function'){ 
  handle[path](response,pictures);
 }
 else{
  console.log("no handler found for path"+path);
 }
}

exports.route = route;
