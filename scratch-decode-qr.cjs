const fs = require('fs');
const jsQR = require('jsqr');
const Jimp = require('jimp');

Jimp.read('./src/assets/card-reference.jpg', function(err, image) {
    if (err) {
        console.error(err);
        return;
    }
    const code = jsQR(image.bitmap.data, image.bitmap.width, image.bitmap.height);
    if (code) {
        console.log("Found QR code", code.data);
    } else {
        console.log("No QR code found.");
    }
});
