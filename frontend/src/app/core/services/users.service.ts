import { Injectable } from '@angular/core';
import { Env } from '../../../environments/env';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  staticEnv: Env = new Env();
  USERS_URL = this.staticEnv.LEARNXCEL_API_URL + '/users';

  constructor(private http: HttpClient) {}

  currentUser() {
    return this.http.get<any>(`${this.USERS_URL}/me`, {
      headers:  this.staticEnv.headers
    });
  }

  getUserById(user_id: number) {
    return this.http.get(`${this.USERS_URL}/${user_id}`, {
      headers:  this.staticEnv.headers
    });
  }
}
