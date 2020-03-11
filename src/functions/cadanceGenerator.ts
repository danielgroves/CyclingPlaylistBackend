import { Request, Response } from 'express';
import firestoreService from '../lib/firestore/firestoreService';

export default async function cadanceGenerator(_req: Request, res: Response): Promise<void> {

  var min : number = 70;
  var max : number = 190;
  var denominator : number = 4

  setInterval(async() => {
    var firebaseCadence = await firestoreService.getData('user_metadata', 'cadence');

    var previousCadence = firebaseCadence.previousCadence + denominator;
    var nextCadence = firebaseCadence.nextCadence;
  
    firebaseCadence.nextCadence = previousCadence;

    if(previousCadence >= nextCadence)
      firebaseCadence.previousCadence = nextCadence; 

    if (previousCadence >= max)
      firebaseCadence.previousCadence = min;
  
    await firestoreService.addData('user_metadata', 'cadence', firebaseCadence);
  },5000)
  
  res.send(200);
}
