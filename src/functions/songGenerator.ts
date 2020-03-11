import firestoreService from '../lib/firestore/firestoreService';
import logger from '../helpers/logging.helper';

const variation = 5;

export default async function songGenerator(_snap: any, _context: any): Promise<void> {
  const cadence = await firestoreService.getData('user_metadata', 'cadence');
  const prev =  await firestoreService.getData('user_playlist', 'playlist');
  const tracks = await firestoreService.queryData('tracks', [['tempo', '>=', cadence.nextCadence - variation], ['tempo', '<=', cadence.nextCadence + variation]]);

  logger.debug('cadence', cadence);
  logger.debug('prev', prev);
  logger.debug('tracks', tracks);

  if (!tracks) return;

  let selectTrack = 0;
  if (tracks.length > 1) {
    const prevTrackIndex = tracks.findIndex(x => x.id == prev.id);
    logger.debug('checking if previous track still applies', {
      prevId: prev.id,
      exists: prevTrackIndex >= 0,
      index: prevTrackIndex
    })
    if (prevTrackIndex >= 0) {
      selectTrack = prevTrackIndex;
    }
    else {
      logger.debug('selecting random match');
      selectTrack = Math.floor(Math.random() * tracks.length);
    }
  }

  logger.debug('selectTrack', { selectTrack });

  const playlistOb = {
    id: tracks[selectTrack].id,
    prevTrackId: prev.id,
    cadence: cadence.nextCadence
  };
  logger.debug('update playlist', playlistOb)
  await firestoreService.addData('user_playlist', 'playlist', playlistOb);
}
