var path = require('path');
var imageMagick = require('gm').subClass({ imageMagick: true });

exports.drawText = function(s, cb) {
  imageMagick(220, 200 * s.length, '#ffffff')
    .transparent('#ffffff')
    .font(path.join(__dirname, '../tkaishogt01.ttf'))
    .fontSize(200)
    .gravity('North')
    .drawText(0, 0, s.split("").join('\n'))
    .toBuffer('png', cb);
}

