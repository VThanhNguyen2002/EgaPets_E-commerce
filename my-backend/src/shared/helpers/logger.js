const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const logFormat = format.printf(({ level, message, timestamp, stack }) =>
  `${timestamp} ${level}: ${stack || message}`);

module.exports = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(format.timestamp(), format.errors({ stack: true }), logFormat),
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      dirname: 'logs', filename: '%DATE%.log', datePattern: 'YYYY‑MM‑DD',
      maxFiles: '14d', zippedArchive: true
    })
  ]
});