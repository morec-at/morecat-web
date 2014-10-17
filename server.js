var express = require('express'),
  app = express();

//initialize static server that will spit out contents of public folder
app.use('/', express.static(__dirname + '/_public'));

//send our main angular html file if any link without dot is requested, e.g. 'http://someurl/about'
//this is our actual server side redirect, we don't send index.html when there's dot in link assuming such a request
//is for static data like .js, .css or .html
app.get('/[^\.]+$', function(req, res) {
  res.set('Content-Type', 'text/html')
    .sendfile(__dirname + '/_public/index.html');
});

app.listen(8888, '0.0.0.0'); //the express server will start on port 8888
console.log('started');
