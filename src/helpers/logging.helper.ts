import ConsoleLogger from "../lib/logging/consoleLogger";
import GoogleLogger from "../lib/logging/googleLogger";
import NoLogger from "../lib/logging/noLogger";
import ILogger from "../interfaces/iLogger";

export function getLogger(node_env?: string, gcloud_env?: string, logging?: string): ILogger {
  let logger: ILogger;

  // If GCLOUD_PROJECT is set then we're in a Google Environment so the firebase-admin SDK will work.
  if (gcloud_env) {
    logger = new GoogleLogger();
    logger.info('Google Logger');
  }
  else if (node_env === 'test' && !logging) {
    logger = new NoLogger();
    logger.info('No Logger');
  }
  else {
    logger = new ConsoleLogger();
    logger.info('Console Logger');
  }

  return logger;
}

export default getLogger(process.env.NODE_ENV, process.env.GCLOUD_PROJECT, process.env.LOGGING);
