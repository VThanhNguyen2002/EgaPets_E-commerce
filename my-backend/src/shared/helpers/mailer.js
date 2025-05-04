/**
 *  Tiny mail helper – dùng Nodemailer
 *  ENV cần:
 *    MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS, MAIL_FROM (tên hiển thị)
 */
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host : process.env.MAIL_HOST,
  port : Number(process.env.MAIL_PORT || 465),
  secure : Number(process.env.MAIL_PORT) === 465,      // SSL
  auth : {
    user : process.env.MAIL_USER,
    pass : process.env.MAIL_PASS,
  },
});

/**
 * Gửi mail HTML
 * @param {Object} opts { to, subject, html }
 */
async function sendMail(opts) {
  const from = process.env.MAIL_FROM || '"EGA Pets" <no-reply@egapets.com>';
  await transporter.sendMail({ from, ...opts });
}

module.exports = { sendMail };
