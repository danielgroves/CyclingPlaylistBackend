import * as functions from 'firebase-functions';
import { RuntimeOptions } from 'firebase-functions';

const options: RuntimeOptions = {
  memory: '128MB'
}

import admin from 'firebase-admin';
import { serviceAccount } from './lib/firestore/service';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hackday-spotify.firebaseio.com"
});

exports.cadanceGenerator = functions.runWith(options).region('europe-west1').https.onRequest(require('./functions/cadanceGenerator').default);
