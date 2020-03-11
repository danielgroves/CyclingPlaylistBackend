import { Firestore } from '@google-cloud/firestore';

class FirestoreService {
  private firestore: Firestore;

  constructor() {
    this.firestore = new Firestore();
  }

  async addData(collection: string, id: string, data: any): Promise<void> {
    await this.firestore.collection(collection).doc(id).set({
      ...data
    })
    console.debug('Saved new value to firestore', {
      id,
      ...data
    })
  }

  async getData(collection: string, id: string): Promise<any> {
    await this.firestore.collection(collection).doc(id).get();
  }
}

export default new FirestoreService();
