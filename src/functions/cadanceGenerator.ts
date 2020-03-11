import { Request, Response } from 'express';

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
}
