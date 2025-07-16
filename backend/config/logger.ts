const winston = require('winston');

module.exports = {
  level: 'debug',
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.simple(),
        winston.format.prettyPrint()
      )
    })
  ]
};