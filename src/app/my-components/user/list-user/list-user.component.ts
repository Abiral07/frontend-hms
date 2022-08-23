import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../../service/user.service";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {catchError,of as observableOf} from "rxjs";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'USER-NAME', 'FULL-NAME', 'EMAIL', 'MOBILE', 'DOB', 'AGE'];
  users: any;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private userService: UserService, private router:Router) {
  }

  ngAfterViewInit(): void {
    this.users.paginator = this.paginator;
    }
  ngOnInit() {
    console.log("GET all User called");
    this.userService.getAllUser()
      .pipe(catchError(() => observableOf(null)))
      .subscribe(
        (data:any) => (this.users = new MatTableDataSource(data))
        ,error => alert(error.error.error+":   "+error.error.message));
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();
  }

  rowClicked(row:any) {
    console.log('row clicked');
    this.router.navigate([`/updateUser/${row.uid}`]);
  }
}
