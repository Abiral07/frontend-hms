import {Injectable} from '@angular/core';
import {User} from "../dto/user.registration";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Subject} from "rxjs";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl;
  public loginStatus = new Subject<boolean>;

  constructor(private http: HttpClient) {
  }

  addUser(user: User) {
    return this.http.post(`${this.baseUrl}/registration`, user);
  }

  logUser(user: any) {
    return this.http.post(`${this.baseUrl}/login`, user);
  }

  saveDetails(token: string, roles: Array<string>) {
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('roles', JSON.stringify(roles))
    // this.loginStatus.next(true);
    return true;
  }

  isLoggedIn() {
    let token = sessionStorage.getItem('token');
    return !(token == undefined || token == '' || token == null);
  }

  getRoles() {
    return sessionStorage.getItem('roles');
  }

  logOut() {
    console.log('local clear')
    sessionStorage.clear();
    this.loginStatus.next(false);
    return true;
  }


  isAdmin() {
    if (sessionStorage.getItem('roles')) {
      return !!(JSON.parse(sessionStorage.getItem('roles')!).includes('ROLE_ADMIN'));
    }
    return false;
  }
}
