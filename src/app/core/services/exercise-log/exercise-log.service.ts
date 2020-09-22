import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import ExerciseLog from '../../interfaces/exercise-log';

@Injectable({
  providedIn: 'root'
})
export class ExerciseLogService {

  constructor(
    private db: AngularFirestore
  ) {}

  createExerciseLog(uid: string, exerciseTime: number) {
    const timestamp = firebase.firestore.Timestamp.now();
    const dayOfWeek = new Date().getDay();
    const initialLogData: ExerciseLog = {
      uid,
      created_at: timestamp,
      updated_at: timestamp,
      exercise_time: exerciseTime,
      day_of_week: [ 'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sta' ][dayOfWeek]
    };

    this.db.collection('exercise-logs').add(initialLogData)
        .then( res => console.log(res) )
        .catch(err => {
          console.log(err);
          alert('エクササイズログの作成に失敗しました。\n' + err);
        });
  }

  updateExerciseLog(uid: string, exerciseTime: number): Observable<ExerciseLog[]> {
    const now = firebase.firestore.Timestamp.now();
    const nowData = now.toDate();
    const fullYear = nowData.getFullYear();
    const month = nowData.getMonth() + 1;
    const date = nowData.getDate();

    const today = new Date(`${fullYear}-${month}-${date}`);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const startDate = firebase.firestore.Timestamp.fromDate(today);
    const endDate = firebase.firestore.Timestamp.fromDate(tomorrow);
    return this.db
      .collection<ExerciseLog>(
        'exercise-logs',
          ref =>
            ref.where('created_at', '>=', startDate)
               .where('created_at', '<', endDate)
      )
      .valueChanges({ idField: 'id' })
      .pipe(
        take(1),
        tap(res => {
          if (res.length > 0) {
            const data: ExerciseLog = res[0];
            data.exercise_time = data.exercise_time + exerciseTime;
            data.updated_at = now;
            const id = data.id;
            return this.db.collection('exercise-logs').doc(id).update(data);
          } else {
            this.createExerciseLog(uid, exerciseTime);
          }
        })
      );
  }
}
