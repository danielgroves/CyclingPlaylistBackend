import ILogger from "../../interfaces/iLogger";

class ConsoleLogger implements ILogger {
  log = console.log;
  debug = console.debug;
  info = console.info;
  warn = console.warn;
  error = console.error;
}

export default ConsoleLogger;
