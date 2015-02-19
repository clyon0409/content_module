
//fs module allows us to read and write content for responses!!
var fs = require('fs');
var path = require('path');

module.exports = function(request,response){
	//see what URL the clients are requesting:
	console.log('hello from my server');
	console.log('static content got client request URL: ', request.url);


	var data = path.parse(request.url);
	var file_path;
	console.log(data);
	var content_type;
	switch(data.ext){
		case'.jpg':
		case '.jpeg':
			content_type = 'image/jpeg';
			file_path = "."+ data.dir + "/" + data.base;
			break;
		case '.png':
			content_type = 'image/png';
			file_path = "."+ data.dir + "/" + data.base;
			break;
		case '.css':
			content_type = 'text/css';
			file_path = "."+ data.dir + "/" + data.base;
			break;		
		default:	
			content_type = 'text/html';
			if (!data.base)
			{
				file_path = "./views/index.html";
			}
			else
			{
				console.log(data["base"]);
				file_path = "./views/"+ data["base"] +".html";
			}
			break;
	}

	console.log(file_path);

	if(request.url !== ''){
		console.log("file: " + file_path + " content_type " + content_type);
		if (content_type === 'text/html' || content_type === 'text/css' )
		{
			fs.readFile(file_path, 'utf8', function(errors, contents){
				response.writeHead(200, {'Content-Type': content_type}); //send data about response
				response.write(contents); // send response body
				response.end(); //finished!
			});
		}
		else
		{
			fs.readFile(file_path, function(errors, contents){
				response.writeHead(200, {'Content-Type': content_type}); //send data about response
				response.write(contents); // send response body
				response.end(); //finished!
			});
		}
	}else {
		response.writeHead(404);
		response.end('File not found!!!!');
	}
};