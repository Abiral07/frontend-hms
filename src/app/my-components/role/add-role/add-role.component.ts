import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {RoleService} from "../../../service/role.service";

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {
  @Output() role = new EventEmitter();
  addRoleForm: FormGroup

  constructor(private roleService: RoleService) {
    this.addRoleForm = new FormGroup({
      roleName: new FormControl(null, [Validators.required, Validators.max(20), Validators.min(2)]),
      roleDescription: new FormControl(null, [Validators.required, Validators.min(8), Validators.max(100)])
    })
  }

  ngOnInit(): void {
  }

  addRole() {
    this.roleService.addRole(this.addRoleForm.value).subscribe(
      (res) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Role Added Successfully',
          showConfirmButton: false,
          timer: 1500
        });
        this.role.emit(res);
        console.log("added room: ", res)
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
