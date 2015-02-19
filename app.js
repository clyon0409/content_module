//get the http module:
var http = require('http');

//creatig a server using http module:
var static_content = require('./static.js');
var server = http.createServer(function(request,response){
	//see what URL the clients are requesting:
	console.log('hello from my main server');
	console.log('client request URL: ', request.url);
	//this is how we do routing:
	static_content(request,response);
})

// tell your server which port to routing on
server.listen(6789);
// print to terminal window
console.log('Running in localhost at port 6789');