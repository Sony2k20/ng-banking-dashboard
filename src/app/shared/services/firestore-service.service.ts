import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  deleteDoc,
  where,
  query,
  getDocs,
  orderBy,
  setDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FirestoreServiceService {
  constructor(
    private firestore: Firestore,
    private storage: AngularFireStorage
  ) {}

  getPostsOrderByDate(): Observable<T[]> {
    const postCollection = collection(this.firestore, 'posts');
    const queryType = query(postCollection, orderBy('published', 'desc'));
    return collectionData(queryType, { idField: 'id' }) as Observable<Post[]>;
  }

  getPostsOrderByTitle(): Observable<Post[]> {
    const postCollection = collection(this.firestore, 'posts');
    const queryType = query(postCollection, orderBy('title'));
    return collectionData(queryType, { idField: 'id' }) as Observable<Post[]>;
  }

  async countPostsbyType(fieldName: string, value: string) {
    const postCollection = collection(this.firestore, 'posts');
    const queryType = query(postCollection, where(fieldName, '==', value));
    const querySnapshot = await getDocs(queryType);
    const count = querySnapshot.size;
    return count;
  }

  async setPost(post: Post, id: string) {
    //setdoc() not working with reference
    const postCollection = collection(this.firestore, 'posts');
    const postRef = doc(postCollection, id);
    await setDoc(postRef, post, { merge: true });
    // await setDoc(postRef, {'published': Timestamp.now()}, { merge: true });
  }

  getPostsCount(): Observable<Post[]> {
    const postCollection = collection(this.firestore, 'posts');
    const queryType = query(postCollection, orderBy('published'));
    return collectionData(queryType, { idField: 'id' }) as Observable<Post[]>;
  }

  getPostData(id: string): Observable<Post> {
    const postData = doc(this.firestore, `posts/${id}`);
    return docData(postData, { idField: 'id' }) as Observable<Post>;
  }

  deleteNote(id: string) {
    const postRef = doc(this.firestore, `posts/${id}`);
    return deleteDoc(postRef);
  }
}
