import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  generateToken(loginUserDetails: any) {
    return this.http.post(`${this.url}/token`, loginUserDetails); //url was without token
  }

  loginUser(token: string) {
    localStorage.setItem('token', token);
    return true;
  }

  isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token == undefined || token == null || token == '') {
      return false;
    } else {
      return true;
    }
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
