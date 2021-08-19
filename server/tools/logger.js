/*
 * nodejs中log工具 
 */
const logger = require('log4js');

function createLogger(level = 'debug') {
  // 声明logger
  const log = logger.getLogger('server');
  log.level = level;

  const customlog = {};
  // 自定义info方法
  customlog.info = (str) => {
    log.info('==========  INFO START ==========');
    log.info('\x1B[42m%s\x1B[0m', str);
    log.info('==========  INFO  END  ==========');
  }
  // 自定义debug方法
  customlog.debug = (str) => {
    log.debug('==========  DEBUG START ==========');
    log.debug('\x1B[46m%s\x1B[0m', str)
    log.debug('==========  DEBUG  END  ==========');
  }
  // 自定义warn方法
  customlog.warn = (str) => {
    log.warn('==========  WARN START ==========');
    log.warn('\x1B[43m%s\x1B[0m', str)
    log.warn('==========  WARN  END  ==========');
  }
  // 自定义error方法
  customlog.error = (str) => {
    log.error('==========  ERROR START ==========');
    log.error('\x1B[41m%s\x1B[0m', str)
    log.error('==========  ERROR  END  ==========');
  }
  // 自定义fatal方法
  customlog.fatal = (str) => {
    log.fatal('==========  FATAL START ==========');
    log.fatal('\x1B[45m%s\x1B[0m', str)
    log.fatal('==========  FATAL  END  ==========');
  }
  return customlog
}

module.exports = createLogger
