import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }

  getAllRole() {
    return this.http.get(`${this.baseUrl}/getRoles`)
  }
  getRoleByName(userName:any) {
    return this.http.get(`${this.baseUrl}/getRoles/${userName}`)
  }
  addRole(newRole:any) {
    return this.http.post(`${this.baseUrl}/addRole`,newRole);
  }
  updateRole(roleId:any,updateData:any) {
    return this.http.post(`${this.baseUrl}/updateRole/${roleId}`,updateData);
  }
  assignRole(uid:any,rolesArray:any){
    return this.http.post(`${this.baseUrl}/addRoleToUser`,rolesArray);
  }


}
