import * as firebase from 'firebase/app';
import WeightLog from './weight-log';

export default interface User {
  uid: string;
  created_at: firebase.firestore.Timestamp;
  email: string;
  updated_at: firebase.firestore.Timestamp;
  username: string;
  weight_logs?: WeightLog[];
}
