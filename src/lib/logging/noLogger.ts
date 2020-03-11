import ILogger from "../../interfaces/iLogger";

// This exists to stop noise during test runs.
// It just disposes or any logs, set LOGGING=true
// to use console logging instead.
class NoLogger implements ILogger {
  log(_message: String, _metadata: any = {}): void {
    return;
  }

  debug(_message: String, _metadata: any = {}): void {
    return;
  }

  info(_message: String, _metadata: any = {}): void {
    return;
  }

  warn(_message: String, _metadata: any = {}): void {
    return;
  }

  error(_message: String, _metadata: any = {}): void {
    return;
  }
}

export default NoLogger;
