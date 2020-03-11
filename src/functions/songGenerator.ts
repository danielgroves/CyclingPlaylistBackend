import firestoreService from '../lib/firestore/firestoreService';

export default async function songGenerator(_snap: any, _context: any): Promise<void> {
  const cadence = await firestoreService.getData('user_metadata', 'cadence');
  const prev =  await firestoreService.getData('user_playlist', 'playlist');
  const tracks = await firestoreService.queryData('tracks', [['tempo', '>=', cadence.nextCadence - 10], ['tempo', '<=', cadence.nextCadence + 10]]);

  await firestoreService.addData('user_playlist', 'playlist', {
    id: tracks[0].id,
    prevTrackId: prev.id,
    cadence: cadence.nextCadence
  });
}
