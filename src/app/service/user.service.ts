import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "../dto/user.registration";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getCurrentUser(){
    return this.http.get(`${this.baseUrl}/current-user`);
  }

  getUserDetails() {
    let user = sessionStorage.getItem('user')
    if (user != null) {
      return JSON.parse(user);
    } else {
      // this.authService.logOut();
      // alert("no user details found. loging out");
      return null;
    }
  }

  getAllUser() {
    return this.http.get(`${this.baseUrl}/getUsers`)
  }

  getUserById(id: number) {
    return this.http.get(`${this.baseUrl}/getUser/${id}`)
  }

  getUserByName(name: string) {
    return this.http.get(`${this.baseUrl}/getUser/name/${name}`)
  }

  updateUser(user: any, uid:number) {
    return this.http.post(`${this.baseUrl}/updateUser/${uid}`, user)
  }
  changePassword(password: any, uid:number){
    return this.http.post(`${this.baseUrl}/change-password/${uid}`, password)
  }
}
