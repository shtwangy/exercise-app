import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore} from '@angular/fire/firestore';
import User from '../../interfaces/user';
import { Observable, of, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import {LocalStorageService} from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;
  isSignedIn = false;

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private localStorageService: LocalStorageService
  ) { }

  signIn(email: string, password: string): Observable<any> {
    // validation TODO: メソッド化する
    if ( email === '' || password === '' ) {
      alert('必須項目が未入力です');
      return of(false);
    }

    this.auth.signInWithEmailAndPassword(email, password)
        .then(res => {
          const user = res.user;
          if (user) {
            const uid = user.uid;
            return this.db.collection('users').doc(uid).get()
              .pipe( tap(snapshot => {
                const data = snapshot.data();
                this.currentUser = {
                  uid: data.uid,
                  created_at: data.created_at,
                  email: data.email,
                  updated_at: data.updated_at,
                  username: data.username
                };
                this.isSignedIn = true;
                this.localStorageService.store('login', { email, password });
                this.router.navigate(['/weight']);
              })).subscribe();
          }
        })
        .catch(err => {
          console.log(err);
          alert('サインインに失敗しました。\n' + err);
          return of(false);
        });
  }

  signUp(username: string, email: string, password: string, confirmPassword: string): Observable<any> {
    // validation TODO: メソッド化する
    if (username === '' || email === '' || password === '' || confirmPassword === '') {
      alert('必須項目が未入力です');
      return of(false);
    }

    if (password !== confirmPassword) {
      alert('パスワードと確認用パスワードが一致しません');
      return of(false);
    }

    return of(this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        const user = res.user;
        if (user) {
          const uid = user.uid;
          const timestamp = firebase.firestore.Timestamp.now();

          const userInitialData: User = {
            uid,
            created_at: timestamp,
            email,
            updated_at: timestamp,
            username
          };

          this.db.collection('users').doc(uid).set(userInitialData)
            .then(() => {
              this.currentUser = userInitialData;
              this.router.navigate(['/exercise']);
            });
        }
      })
      .catch(err => {
        console.log(err);
        alert('アカウントの作成に失敗しました。\n' + err);
      }));
  }
}
