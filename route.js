function route(handle,path){

 console.log("Routing information for "+path);

 if (typeof handle[path] === 'function') {

  handle[path]();

 }

 else{

  console.log("no handler found for path"+path);

 }

}

exports.route = route;
