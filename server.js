const http = require('http');
var express = require('express');
const socketIO = require('socket.io');

var path = require('path');
var envFile = require('node-env-file');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

try {
  envFile(path.join(__dirname, 'config/' + process.env.NODE_ENV + '.env'));
} catch (e) {

}

var amazon = require('amazon-product-api');
var client = amazon.createClient({
  awsId: process.env.AWS_ID,
  awsSecret: process.env.AWS_SECRET,
  awsTag: "Todo App"
});

const PORT = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(function (req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

app.use(express.static('public'));

io.on('connection', (socket) =>  {
  socket.on('search', (term, callback) => {
    client.itemSearch({
      keywords: term,
      responseGroup: 'ItemAttributes,Images'
    }).then(function(results){
      var item = results[0]["ItemAttributes"][0]["Title"][0];
      var image = results[0]["MediumImage"][0]["URL"][0];
      var link = results[0]["DetailPageURL"][0];
      console.log('link:', link);
      callback(item, image, link);
    }).catch(function(err){
    });
  });
});

server.listen(PORT, function () {
  console.log('Express server is up on port ' + PORT);
});
