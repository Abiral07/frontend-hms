import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RoomService} from "../../../service/room.service";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {
  types=['DIAMOND','PLATINUM','GOLD','SILVER','BRONZE'];
  addRoomForm :FormGroup
  constructor(private roomService:RoomService) {
    this.addRoomForm = new FormGroup({
      type: new FormControl(null,[Validators.required]),
      price: new FormControl(null,[Validators.required,Validators.pattern(/^\d+\.?\d*$|^\d*\.?\d+$/)])
    })
  }

  ngOnInit(): void {
  }

  addRoom() {
    this.roomService.addRoom(this.addRoomForm.value).subscribe(
      (res)=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Room Added Successfully',
          showConfirmButton: false,
          timer: 1500
        });
        console.log("added room: ",res)
      },error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.error.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }
}
