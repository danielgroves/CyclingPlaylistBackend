declare interface ILogger {
  log(message: String, metadata: any): void
  log(message: String): void
  debug(message: String, metadata: any): void
  debug(message: String): void
  info(message: String, metadata: any): void
  info(message: String): void
  warn(message: String, metadata: any): void
  warn(message: String): void
  error(message: String, metadata: any): void
  error(message: String): void
}

export default ILogger;
