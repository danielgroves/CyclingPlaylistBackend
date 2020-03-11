import { Request, Response } from 'express';
import firestoreService from '../lib/firestore/firestoreService';

<<<<<<< HEAD
export default function cadanceGenerator(_req: Request, res: Response): void {

  //min 0
  //max 120

  var maxCadence = 120;
  var previousCadence = 2;
  var nextCadence = 0;
  
  let list: number[] = new Array(maxCadence); 
  
  for (var i = previousCadence; i < list.length; i++){
    nextCadence = i+2;
    break;
  }

  const healthStats:JSON = <JSON><unknown>{
    "previousCadence": previousCadence,
    "nextCadence" : nextCadence
}
  
  res.send(healthStats);
=======
export default async function cadanceGenerator(_req: Request, res: Response): Promise<void> {
  await firestoreService.addData('user_metadata', 'dan', {
    cadence: 123
  });
  res.send(200);
>>>>>>> firestore
}
