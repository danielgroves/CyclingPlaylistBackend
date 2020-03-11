import ILogger from '../../interfaces/iLogger';
import { Log, Logging } from "@google-cloud/logging";
import { LogEntry, Entry, LogSeverity } from "@google-cloud/logging/build/src/entry";

class GoogleLogger implements ILogger {
  private logger: Log;
  private metadata: LogEntry;

  constructor() {
    const cf_function_name = process.env.FUNCTION_NAME || 'undefined';
    const cf_region = process.env.FUNCTION_REGION || 'undefined';
    const logger_type = 'cloud_function';

    const logging: Logging = new Logging();
    this.logger = logging.log(cf_function_name);

    this.metadata = {
      resource: {
        type: logger_type,
        labels: {
          function_name: cf_function_name,
          region: cf_region
        }
      }
    }
  }

  private write_log(severity: LogSeverity, message: String, metadata: any): void {
    const google_metadata: LogEntry = {
      ...this.metadata,
      severity
    }

    const google_entry: Entry = this.logger.entry(google_metadata, {
      message,
      ...metadata
    });

    this.logger.write(google_entry);
  }

  log(message: String, metadata: any = {}): void {
    this.write_log('debug', message, metadata);
  }

  info(message: String, metadata: any = {}): void {
    this.write_log('info', message, metadata);
  }
  debug(message: String, metadata: any = {}): void {
    this.write_log('debug', message, metadata);
  }
  warn(message: String, metadata: any = {}): void {
    this.write_log('warn', message, metadata);
  }
  error(message: String, metadata: any = {}): void {
    this.write_log('error', message, metadata);
  }
}

export default GoogleLogger;
