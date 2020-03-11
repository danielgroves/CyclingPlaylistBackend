import { Firestore } from '@google-cloud/firestore';
import logger from '../helpers/logger';

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
    const doc = await this.firestore.collection(collection).doc(id).get();
    return doc.data();
  }

  async queryData(collection: string, query: Array<any>): Promise<any[]>  {
    logger.debug('query', {
      collection,
      query,
    });

    const docs = await this.firestore.collection(collection).where(query[0], query[1], query[2]).get();
    const result: any[] = [];

    docs.forEach(async (doc) => {
      const data = await doc.data();
      data.id = doc.id;
      result.push(data);
    });

    logger.debug('query_result', result);

    return result;
  }
}

export default new FirestoreService();
