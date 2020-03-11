import { Request, Response } from 'express';
import firestoreService from '../lib/firestore/firestoreService';

export default async function cadanceGenerator(_req: Request, res: Response): Promise<void> {
  await firestoreService.addData('user_metadata', 'dan', {
    cadence: 123
  });
  res.send(200);
}
