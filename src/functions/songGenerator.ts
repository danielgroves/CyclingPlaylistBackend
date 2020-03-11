import firestoreService from '../lib/firestore/firestoreService';

export default async function songGenerator(_req: Request, res: Response): Promise<void> {
  const cadence = await firestoreService.getData('user_metadata', 'cadence');
  const tracks = await firestoreService.queryData('tracks', ['tempo', '>=', cadence.nextCadence]);

  await firestoreService.addData('user_playlist', 'nextSong', {
    id: tracks[0].id
  })

  console.log(tracks);

  res.send(200);
}
