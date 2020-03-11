import * as functions from 'firebase-functions';
import { RuntimeOptions } from 'firebase-functions';

const options: RuntimeOptions = {
  memory: '128MB'
}
const region = 'europe-west1';

import admin from 'firebase-admin';
import { serviceAccount } from './lib/firestore/service';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hackday-spotify.firebaseio.com"
});

exports.cadanceGenerator = functions.runWith(options).region(region).https.onRequest(require('./functions/cadanceGenerator').default);
exports.songGenerator = functions.runWith(options).region(region).https.onRequest(require('./functions/songGenerator').default);
