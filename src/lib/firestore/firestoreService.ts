import { Firestore } from '@google-cloud/firestore';

class FirestoreService {
  private firestore: Firestore;

  constructor() {
    this.firestore = new Firestore();
  }

  async addData(collection: string, id: string, data: any): Promise<void> {
    await this.firestore.collection(collection).add({
      id,
      ...data
    })
    console.debug('Saved new value to firestore', {
      id,
      ...data
    })
  }
}

export default new FirestoreService();
