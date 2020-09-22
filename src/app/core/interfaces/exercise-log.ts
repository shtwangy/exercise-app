import * as firebase from 'firebase/app';

export default interface ExerciseLog {
  id?: string;
  uid: string;
  created_at: firebase.firestore.Timestamp;
  updated_at: firebase.firestore.Timestamp;
  exercise_time: number;
  day_of_week: string;
}
