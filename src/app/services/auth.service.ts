import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { LoginData } from '../interfaces/login-data.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uid: string | undefined;

  constructor(private auth: Auth) { }

  async register({ name, email, password }: LoginData) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(() => {
      this.uid = this.auth.currentUser?.uid;
    });
  }

  async login({ name, email, password }: LoginData) {
    return signInWithEmailAndPassword(this.auth, email, password).then(() => {
      this.uid = this.auth.currentUser?.uid;
    });
  }

  logout() {
    return signOut(this.auth);
  }

  getUID(): string | undefined{
    return this.uid;
  }

  currentUser() {
    return this.auth.currentUser;
  }
}
