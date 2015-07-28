var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var config = require('../config');

exports.exists = function(key, cb) {
  s3.headObject({
    Bucket: config.BUCKET,
    Key: key
  }, function(err, data) {
    cb(!err);
  });
};

exports.put = function(key, buffer, cb) {
  s3.putObject({
    Bucket: config.BUCKET,
    Key: key,
    Body: buffer,
    ContentType: 'image/png'
  }, cb);
};
