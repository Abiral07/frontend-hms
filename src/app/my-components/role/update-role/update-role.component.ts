import { Component, OnInit } from '@angular/core';
import {RoleService} from "../../../service/role.service";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css']
})
export class UpdateRoleComponent implements OnInit {
  roleId:any;
  updateRoleForm: FormGroup
  constructor(private roleService:RoleService,private activatedRoute:ActivatedRoute) {
    this.roleId=this.activatedRoute.snapshot.params['id'];
    this.updateRoleForm = new FormGroup({
      roleName: new FormControl(null, [Validators.max(20), Validators.min(2)]),
      roleDescription: new FormControl(null, [Validators.min(8), Validators.max(100)])
    })
  }

  ngOnInit(): void {
  }

  updateRole() {
    this.roleService.updateRole(this.roleId,this.updateRoleForm.value).subscribe(
      (res) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Role Update Successfully',
          showConfirmButton: false,
          timer: 1500
        })
      }, error => {
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
