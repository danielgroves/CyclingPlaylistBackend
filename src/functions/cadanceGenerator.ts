import { Request, Response } from 'express';
import firestoreService from '../lib/firestore/firestoreService';

export default function cadanceGenerator(_req: Request, res: Response): void {
  firestoreService.addData('user_metadata', 'dan', {
    cadence: 123
  });
  res.send(200);
}
