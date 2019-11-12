var winston = require('winston');

var options = {
    file: {
      level: 'info',
      filename: `/logger/app.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: true,
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
};

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false, // do not exit on handled exceptions
});
logger.stream = {
  write: (message, encoding) => {
    logger.info(message);
  },
};

module.exports = logger;