import { Request, Response } from 'express';
import firestoreService from '../lib/firestore/firestoreService';

export default async function cadanceGenerator(_req: Request, res: Response): Promise<void> {

  
  var firebaseCadence = await firestoreService.getData('user_metadata', 'cadence');

  var min : number = firebaseCadence.min;
  var max : number = firebaseCadence.max;
  var denominator : number = firebaseCadence.range;

  firebaseCadence.cadence = firebaseCadence.cadence >= max ? min : firebaseCadence.cadence + denominator;

  await firestoreService.addData('user_metadata', 'cadence', firebaseCadence);
  
res.send(200);
}
