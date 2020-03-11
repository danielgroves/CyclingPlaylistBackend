import firestoreService from '../lib/firestore/firestoreService';
import logger from '../helpers/logging.helper';

export default async function songGenerator(_snap: any, _context: any): Promise<void> {
  const cadence = await firestoreService.getData('user_metadata', 'cadence');
  const tracks = await firestoreService.queryData('tracks', ['tempo', '>=', cadence.nextCadence]);

  logger.debug('Got tracks: ' , tracks);

  await firestoreService.addData('user_playlist', 'playlist', {
    id: tracks[0].id
  });
}
