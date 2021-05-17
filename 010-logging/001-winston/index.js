const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: {service: 'user-service'},
  transports: [
    // сюда будут попадать ошибки уровня error
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // Сюда будет валиться всё
    new winston.transports.File({filename: 'combined.log'}),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
    level: 'silly'
  }));
}

logger.verbose("verbose воадлыовдало");
logger.debug("debug какой-то");
logger.info("info hello...");
logger.error("error ошибка какая-то...");
