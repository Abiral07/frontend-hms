import {Component, OnInit} from '@angular/core';
import {RoleService} from "../../../service/role.service";
import {AuthService} from "../../../service/auth.service";
import {catchError, of as observableOf} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.css']
})
export class ListRoleComponent implements OnInit {

  isAdmin?:boolean;
  displayedColumns: string[] = ['ROLE-ID', 'ROLE', 'DESCRIPTION','ACTION'];
  roles: any;
  constructor(private roleService:RoleService,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.roleService.getAllRole()
      .pipe(catchError(() => observableOf(null)))
      .subscribe(
        (data:any) => {this.roles = new MatTableDataSource(data)},
        (error:any) => alert(error.error.error+":   "+error.error.message));
  }

  pushRole(role: any) {
    this.roles.data=[ ...this.roles.data,role]
  }

  editRole(row:any) {
    this.router.navigateByUrl(`/updateRole/${row.roleId}`, {state:{row}});
  }
}
