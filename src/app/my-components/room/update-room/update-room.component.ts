import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {RoomService} from "../../../service/room.service";
import Swal from "sweetalert2";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-update-room',
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.css']
})
export class UpdateRoomComponent implements OnInit {
  selectRoom: FormGroup;
  updateRoomForm: FormGroup;
  rooms: any;
  room: any
  rid: any
  filteredRoom:any;
  displayedColumns: string[] = ['ROOM-ID', 'TYPE', 'PRICE', 'STATUS'];
  types = ['DIAMOND', 'PLATINUM', 'GOLD', 'SILVER', 'BRONZE'];

  constructor(private roomService: RoomService, private activatedRoute: ActivatedRoute, private router: Router) {
    // @ts-ignore
    if(this.router.getCurrentNavigation()?.extras.state){
      // @ts-ignore
      this.rid=this.router.getCurrentNavigation()?.extras.state['rid'];
    }
    this.selectRoom = new FormGroup({
      type: new FormControl(null, []),
      rid: new FormControl(null, [Validators.required])
    });
    this.updateRoomForm = new FormGroup({
      type: new FormControl(null, []),
      price: new FormControl(null, []),
      status: new FormControl(null, [])
    })
  }


  ngOnInit(): void {
    this.roomService.getAllRooms().subscribe(
      (data: any) => {
        this.rooms = data;
      },
      (error: any) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.error.error + ":   " + error.error.message,
          showConfirmButton: false,
          timer: 1500
        })
      })
    if(this.rid){
      console.log('ngoninit')
      this.roomService.getRoomById(this.rid).subscribe(
        (res) => {
          console.log(res);
          this.room = res;
        }
      );
    }
  }

  getRoomById() {
    this.rid=this.selectRoom.value.rid;
    if(this.rid){
      this.roomService.getRoomById(this.rid).subscribe(
        (res) => {
          console.log(res);
          this.room = res;
        }
      );
    }
    }

  updateRoom() {
    this.roomService.updateRoom(this.selectRoom.value.rid, this.updateRoomForm.value).subscribe(
      (res) => {
        console.log(res);
        this.room = res;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Update Successful',
          showConfirmButton: false,
          timer: 1500
        })
      },error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.error.error + ":   " + error.error.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  rowClicked(row:any) {
    this.roomService.getRoomById(row.rid).subscribe(
      (res) => {
        console.log(res);
        this.room = res;
      }
    );
  }

  getRoomByType() {
    this.roomService.getRoomByType(this.selectRoom.value.type).subscribe(
      (res:any) => {
        console.log(res);
        this.filteredRoom =res;
      }
    );
  }
}
