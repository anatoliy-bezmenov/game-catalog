import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  TOKEN_KEY = '[token]';
  USER_KEY = '[user]';
  

  constructor() { }

  getUser() {
    return localStorage[this.USER_KEY]
  }

  getToken() {
    return localStorage[this.TOKEN_KEY]

  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    return;
  }
}
