import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  allRoom:any;
  private baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }

  getAllRooms(){
    if(this.allRoom==null)
      this.allRoom=this.http.get(`${this.baseUrl}/getRooms`)
    return this.allRoom;
  }

  addRoom(roomData:any) {
    return this.http.post(`${this.baseUrl}/addRoom`,roomData);
  }

  updateRoom(rid:number,updateData:any){
    return this.http.post(`${this.baseUrl}/updateRoom/${rid}`,updateData);
  }
  getRoomByType(type:string){
    return this.http.get(`${this.baseUrl}/getRooms/${type}`);
  }

  getRoomById(rid: number | undefined){
    return this.http.get(`${this.baseUrl}/getRoom/${rid}`);
  }
}
