var http = require('http');
var mailchimpKey = require('./keys.json')['mailchimp'];

function postMailchimp(data, response) {
  // An object of options to indicate where to post to

  var inputData = JSON.stringify(data);

  var reqOptions = {
    host: 'us14.api.mailchimp.com',
    port: '80',
    path: '/3.0/lists/043eeb8a43/members',
    method: 'POST',
    headers: {
      'Authorization': 'apikey ' + mailchimpKey,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(inputData)
    }
  };

  // Set up the request
  var req = http.request(reqOptions, function(res) {
    res.on('data', function(chunk) {
      console.log('Response: ' + chunk);
    });
    res.on('end', function() {
      console.log('respond to user');
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.end("Happy\n");
    })
  });

  req.on('error', function() {
    console.log('problem');
    response.writeHead(500, {"Content-Type": "text/plain"});
    response.end("internal error\n");
  });

  // post the data
  req.write(inputData);
  req.end();
}

var server = http.createServer(function(request, response) {
  console.log(request.method);
  if (request.method === "POST") {
    var requestBody = '';
    request.on('data', function(data) {
      requestBody += data;
      if (requestBody.length > 1e7) {
        response.writeHead(413, 'Request Entity Too Large', {'Content-Type': 'text/plain'});
        response.end("Entity too large\n");
      }
    });
    request.on('end', function() {
      // do mailchimp call blah blah
      var data;
      try {
        data = JSON.parse(requestBody);
      } catch(err) {
        response.writeHead(400, {"Content-Type": "text/plain"});
        response.end("cannot parse the json\n");
      }
      postMailchimp(data, response);
    });
  } else {
    response.writeHead(405, {"Content-Type": "text/plain"});
    response.end("POST only\n");
  }
});

server.listen(8000);

console.log("server running");