//Create web server
var http = require('http');
var fs = require('fs');

//Create server
http.createServer(function (req, res) {
  //Open file
  fs.readFile('comments.js', 'utf8', function(err, data) {
    //Send response
    res.writeHead(200, {'Content-Type': 'text/javascript'});
    res.write(data);
    res.end();
  });
}).listen(8080);

console.log('Server running at http://localhost:8080/');