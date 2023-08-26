/* eslint-disable no-unused-vars */
interface InsertObjectToCollection<T>{
  insertObject(object: T): CollectionManager<T>;
  getCollection(): Array<T>;
  setCollection(collection: Array<T>): CollectionManager<T>;
}

export class CollectionManager<T> implements InsertObjectToCollection<T> {
  private collection: Array<T> = [];
  
  setCollection(collection: T[]) {
      this.collection = [...collection];
      return this;
  }

  insertObject(object: T) {
      this.collection.push(object);
      return this;
  }

  getCollection(): T[] {
      return this.collection;
  }
};
