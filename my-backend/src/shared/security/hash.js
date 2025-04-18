const crypto = require('crypto');

const hashBuffer = (plain) => crypto.createHash('sha256').update(plain).digest();         // Buffer
const hashHex    = (plain) => crypto.createHash('sha256').update(plain).digest('hex');    // hex string

module.exports = { hashBuffer, hashHex };
