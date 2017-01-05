var http = require('http');
var mailchimpKey = require('./keys.json')['mailchimp'];

exports.handler = function index(event, context) {
    if (!event.email_address || !event.name) {
        var err = JSON.stringify({
            title: "Invalid params",
            status: "400",
            detail: "[BadRequest] required fields: email_address, name"
        })
        context.fail(err);
    }
    event.status = "subscribed";
    event.merge_fields = {
        "FNAME": event.name
    };
    var inputData = JSON.stringify(event);
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
        var result = '';
        res.on('data', function(chunk) {
            result += chunk;
        });
        res.on('end', function() {
            if (res.statusCode !== 200) {
                context.fail(new Error(result));
            } else {
                context.done(null, result);
            }
        })
    });
    
    req.on('error', function() {
        context.fail(new Error("[ServerError] unknown error"));
    });
    
    // post the data
    req.write(inputData);
    req.end();
}

