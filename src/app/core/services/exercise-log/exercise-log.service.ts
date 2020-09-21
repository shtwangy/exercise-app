import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import ExerciseLog from '../../interfaces/exercise-log';

@Injectable({
  providedIn: 'root'
})
export class ExerciseLogService {

  constructor(
    private db: AngularFirestore
  ) { }

  createExerciseLog(exerciseTime: number) {
    const timestamp = firebase.firestore.Timestamp.now();
    const dayOfWeek = new Date().getDay();
    const initialLogData: ExerciseLog = {
      created_at: timestamp,
      updated_at: timestamp,
      exercise_time: exerciseTime,
      day_of_week: [ 'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sta' ][dayOfWeek]
    };

    return of(
      this.db.collection('exercise-logs').add(initialLogData)
        .then( res => console.log(res) )
        .catch(err => {
          console.log(err);
          alert('エクササイズログの作成に失敗しました。\n' + err);
        })
    );
  }
}
