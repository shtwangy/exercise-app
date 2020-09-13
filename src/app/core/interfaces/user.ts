import * as firebase from 'firebase/app';

export default interface User {
  uid: string;
  created_at: firebase.firestore.Timestamp;
  email: string;
  updated_at: firebase.firestore.Timestamp;
  username: string;
}
