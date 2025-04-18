const jwt = require('jsonwebtoken');
require('dotenv').config();

const sign   = (payload, exp = '3d') => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: exp });
const verify = (token)                => jwt.verify(token, process.env.JWT_SECRET);

module.exports = { sign, verify };
