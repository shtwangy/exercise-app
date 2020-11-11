import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {take, tap} from 'rxjs/operators';
import WeightLog from '../../interfaces/weight-log';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeightService {

  constructor(
    private db: AngularFirestore
  ) { }

  addWeightLog(uid: string, weight: number) {
    const now = firebase.firestore.Timestamp.now();
    const nowData = now.toDate();
    const fullYear = nowData.getFullYear();
    const month = nowData.getMonth() + 1;
    const date = nowData.getDate();

    const weightLog: WeightLog = {
      date: `${fullYear}-${month}-${date}`,
      value: weight
    };

    this.db.collection('users')
      .doc(uid)
      .collection<WeightLog>('weight_logs')
      .add(weightLog)
      .then( res => {
        console.log(res);
        alert('記録しました!!');
      })
      .catch(err => {
        console.log(err);
        alert('記録に失敗しました。\n' + err);
      });
  }

  updateWeightLog(uid: string, weight: number) {
    const now = firebase.firestore.Timestamp.now();
    const nowData = now.toDate();
    const fullYear = nowData.getFullYear();
    const month = nowData.getMonth() + 1;
    const date = nowData.getDate();

    const weightLog: WeightLog = {
      date: `${fullYear}-${month}-${date}`,
      value: weight
    };

    return this.db.collection('users')
      .doc(uid)
      .collection(
        'weight_logs',
        ref =>
          ref.where('date', '==', `${fullYear}-${month}-${date}`)
      ).valueChanges({ idField: 'id' })
      .pipe(
        take(1),
        tap(data => {
          if (data.length > 0) {
            const id = data[0].id;
            this.db.collection('users').doc(uid).collection<WeightLog>('weight_logs').doc(id).update(weightLog).then(
              res => {
                console.log(res);
                alert('記録しました!!');
              })
              .catch(err => {
                console.log(err);
                alert('記録に失敗しました。\n' + err);
              });
          } else {
            this.addWeightLog(uid, weight);
          }
        })
      );
  }

  getWeightLogs(uid: string): Observable<any> {
    return this.db
      .collection('users')
      .doc(uid)
      .collection<WeightLog>('weight_logs', ref => {
        return ref.orderBy('date', 'asc');
      })
      .valueChanges();
  }
}
