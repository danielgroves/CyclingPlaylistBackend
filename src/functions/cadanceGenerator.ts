import { Request, Response } from 'express';
import firestoreService from '../lib/firestore/firestoreService';

export default async function cadanceGenerator(_req: Request, res: Response): Promise<void> {

  

  setInterval(async() => {
    var firebaseCadence = await firestoreService.getData('user_metadata', 'cadence');

    var min : number = firebaseCadence.min;
    var max : number = firebaseCadence.max;
    var denominator : number = firebaseCadence.range;
    
    firebaseCadence.nextCadence = firebaseCadence.nextCadence >= max ? min : firebaseCadence.nextCadence + denominator;

    await firestoreService.addData('user_metadata', 'cadence', firebaseCadence);
  },5000)
  
  res.send(200);
}
