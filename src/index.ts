import * as functions from 'firebase-functions';
import { RuntimeOptions } from 'firebase-functions';

const options: RuntimeOptions = {
  memory: '128MB'
}

exports.cadanceGenerator = functions.runWith(options).region('europe-west1').https.onRequest(require('./functions/cadanceGenerator').default);
