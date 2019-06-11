const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

/* redirect to https version
app.use (function (req, res, next) {
  if (req.secure || appEnv.isLocal) {
    next();
  } else {
    res.redirect('https://' + req.headers.host + req.url);
  }
});
*/

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}))

app.use(cors());
app.options('*', cors());

// Routes
app.use(require('../routes/api'));
require('./eventChecker');


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Requested route does not exist.');
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json(
    {
      status: err.status || 500,
      data: err.message
      // stack: encHand.encrypt(err.stack)
    }
  );
});

var server = app.listen(process.env.port || 8080, '0.0.0.0');

server.on('listening', onListening);
server.on('request', onRequest);


function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

/**
 * Event listener for HTTP server "request" event.
 * @param req Request object
 * @param res Response object
 */
function onRequest(req, res) {
  console.log(req.method + ' ' + req.url);
}