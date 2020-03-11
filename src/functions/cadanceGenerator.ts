import { Request, Response } from 'express';
import firestoreService from '../lib/firestore/firestoreService';

export default async function cadanceGenerator(_req: Request, res: Response): Promise<void> {

  

  setInterval(async() => {
    var firebaseCadence = await firestoreService.getData('user_metadata', 'cadence');

    var min : number = firebaseCadence.min;
    var max : number = firebaseCadence.max;
    var denominator : number = firebaseCadence.range;
    var nextCadence = firebaseCadence.nextCadence;
    
    while (nextCadence >= min && nextCadence <= max) {
      firebaseCadence.nextCadence = nextCadence + denominator;
      break;
    } 

    /*
    var previousCadence = firebaseCadence.previousCadence + denominator;
    var nextCadence = firebaseCadence.nextCadence;
  
    firebaseCadence.nextCadence = previousCadence;

    if(previousCadence >= nextCadence)
      firebaseCadence.previousCadence = nextCadence; 

    if (previousCadence >= max)
      firebaseCadence.previousCadence = min;
      */
  
    await firestoreService.addData('user_metadata', 'cadence', firebaseCadence);
  },5000)
  
  res.send(200);
}
