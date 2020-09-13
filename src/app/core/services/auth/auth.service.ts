import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore} from '@angular/fire/firestore';
import User from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private db: AngularFirestore
  ) { }

  signIn(username: string, email: string, password: string, confirmPassword: string) {
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user;
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
              this.router.navigate(['/exercise']);
            });
        }
      })
      .catch(err => {
        console.log(err);
        alert('アカウントの作成に失敗しました。\n' + err);
      });
  }
}
