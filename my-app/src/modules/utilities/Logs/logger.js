// logger.js

import log from 'loglevel';
import { APPLICATION_LEVEL } from '../../admin/setups/ConstDecl';


// Map APPLICATION_LEVEL to log levels
const logLevelMap = {
  Production: 'error',
  Test: 'warn',
  Development: 'debug',
};

// Set the log level based on the APPLICATION_LEVEL
log.setLevel(logLevelMap[APPLICATION_LEVEL] || 'debug');

// Log when the logger module is imported and the log level is set
log.info(`[${new Date().toLocaleTimeString()}] Logger module is imported. Log level set to: ${log.getLevel()}`);

export default log;
