import { Firestore, CollectionReference } from '@google-cloud/firestore';
import logger from '../../helpers/logging.helper';

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
    return {
      id: doc.id,
      ...doc.data()
    };
  }

  async queryData(collection: string, query: Array<any>): Promise<any[]>  {
    logger.debug('query', {
      collection,
      query,
    });

    let q: any = this.firestore.collection(collection);

    query.map(x => {
      q = q.where(x[0], x[1], x[2]);
    });

    const docs = await q.get();


    const result: any[] = [];

    docs.forEach(async (doc: any) => {
      const data = await doc.data();
      data.id = doc.id;
      result.push(data);
    });

    logger.debug('query_result', result);

    return result;
  }
}

export default new FirestoreService();
