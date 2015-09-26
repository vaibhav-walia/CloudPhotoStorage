

var server = require("./server");

var router = require("./route");

var requestHandlers = require("./requestHandlers");

var handle = {};



handle["/"] = requestHandlers.start;

handle["/start"] = requestHandlers.start;

handle["/remove"] = requestHandlers.remove;

handle["/upload"] = requestHandlers.upload;

handle["/show"] = requestHandlers.show;



server.start(8889,router.route,handle);


