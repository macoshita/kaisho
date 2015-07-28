console.log('start');

var s3util = require('./lib/s3util');
var drawText = require('./lib/draw').drawText;

var getResponse = function(key) {
  return {
    url: encodeURI('http://kaisho.s3-website-us-east-1.amazonaws.com/' + key)
  };
};

exports.handler = function(event, context) {
  var s = decodeURI(event.string);
  if (!s || s.length > 10) {
    context.fail('no string or too long(limit:10)');
    return;
  }

  var key = 'gen/' + s + '.png';

  s3util.exists(key, function(exists) {
    if (exists) {
      context.succeed(getResponse(key));
    } else {
      drawText(s, function(err, buffer) {
        if (err) {
          context.fail(err);
        } else {
          s3util.put(key, buffer, function(err, data) {
            if (err) {
              context.fail(err);
            } else {
              context.succeed(getResponse(key));
            }
          });
        }
      });
    }
  });
};
