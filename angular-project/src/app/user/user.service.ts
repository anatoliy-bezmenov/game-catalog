import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../types/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string = '';

  constructor(private http: HttpClient) { }

  login(params: { email: string; password: string; }){
    const body = {
      "email": params.email,
      "password": params.password
    }
    const stringifiedBody = JSON.stringify(body)
    return this.http.post<Auth>('http://localhost:4000/auth/login', stringifiedBody, 
    { headers: { Accept: 'application/json', 'Content-Type': 'application/json' } });
  }

  register(params: { email: string; name: string; password: string; rePassword: string; }) {
    const body = {
      "email": params.email,
      "name": params.name,
      "password": params.password,
      "rePassword": params.rePassword
    }
    const stringifiedBody = JSON.stringify(body)
    return this.http.post<Auth>('http://localhost:4000/auth/register', stringifiedBody, 
    { headers: { Accept: 'application/json', 'Content-Type': 'application/json' } });
  }

}
