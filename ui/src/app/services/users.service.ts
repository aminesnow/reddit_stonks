import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  TOKEN: string = 'token';

  constructor(
    private http: HttpClient
    ) { }

  login(username: string, pwd: string)  {
    return this.http.post(`api/auth`, {username, pwd});
  }

  async storeToken(token: string) {
    localStorage.setItem(this.TOKEN, token);
  }
  
  loadToken(): string {
    return localStorage.getItem(this.TOKEN);
  }

  logOut() {
    localStorage.removeItem(this.TOKEN);
  }
}
