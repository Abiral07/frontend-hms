import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {UserService} from "../../../service/user.service";
import {Router} from "@angular/router";
import {catchError, of as observableOf} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {RoomService} from "../../../service/room.service";
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-list-room',
  templateUrl: './list-room.component.html',
  styleUrls: ['./list-room.component.css']
})
export class ListRoomComponent implements OnInit {
  isAdmin?:boolean;
  displayedColumns: string[] = ['ROOM-ID', 'TYPE', 'PRICE', 'STATUS'];
  rooms: any;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private roomService: RoomService, private router:Router,private authService: AuthService) {
  }

  ngAfterViewInit(): void {
    this.rooms.paginator = this.paginator;
  }
  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    console.log("GET all User called");
    this.roomService.getAllRooms()
      .pipe(catchError(() => observableOf(null)))
      .subscribe(
        (data:any) => {this.rooms = new MatTableDataSource(data);
    console.log(data.length);},
        (error:any) => alert(error.error.error+":   "+error.error.message));
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.rooms.filter = filterValue.trim().toLowerCase();
  }

  rowClicked(row:any) {
    this.router.navigateByUrl(`/updateRoom`,{state:{rid:row.rid}});
  }
}
