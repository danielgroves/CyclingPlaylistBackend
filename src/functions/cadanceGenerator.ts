import { Request, Response } from 'express';
import firestoreService from '../lib/firestore/firestoreService';

export default async function cadanceGenerator(_req: Request, res: Response): Promise<void> {

  //min 0
  //max 120

  
  var firebaseCadence = await firestoreService.getData('user_metadata', 'cadence');

  var maxCadence = 120;
  var previousCadence = firebaseCadence.previousCadence;
  var nextCadence = firebaseCadence.nextCadence;

  
  firebaseCadence.previousCadence = nextCadence;
  firebaseCadence.nextCadence = previousCadence+2;
 

  await firestoreService.addData('user_metadata', 'cadence', firebaseCadence);
  
  res.send(200);
}
