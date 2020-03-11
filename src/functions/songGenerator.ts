import firestoreService from '../lib/firestore/firestoreService';
import { Request, Response } from 'express';
import logger from '../helpers/logging.helper';

export default async function songGenerator(_req: Request, res: Response): Promise<void> {
  const cadence = await firestoreService.getData('user_metadata', 'cadence');
  const tracks = await firestoreService.queryData('tracks', ['tempo', '>=', cadence.nextCadence]);

  logger.debug('Got tracks: ' , tracks);

  await firestoreService.addData('user_playlist', 'playlist', {
    id: tracks[0].id
  })

  res.send(200);
}
