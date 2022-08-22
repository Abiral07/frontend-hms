import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import ConfirmPasswordValidation from "../../../customValidators/confirmPassword.validator";
import {UserService} from "../../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from 'sweetalert2';//node_modules/sweetalert2/dist/sweetalert2.js

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  passwordChange: FormGroup;

  constructor(private userService:UserService, private activatedRoute:ActivatedRoute, private router:Router) {
    this.passwordChange = new FormGroup({
        oldPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
        newPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]),
        confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(64)])
      },
      {
        validators: [ConfirmPasswordValidation.mustMatch('newPassword', 'confirmPassword')]
      })
  }

  ngOnInit(): void {
  }

  changePassword() {
    let formData=this.passwordChange.value;
    this.userService.changePassword({oldPassword:formData.oldPassword,newPassword:formData.newPassword},parseInt(<string>this.activatedRoute.snapshot.params['uid'])).subscribe(
      (data:any)=>{Swal.fire({
        position: 'center',
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500
      });
        this.router.navigate(['/profile'])},error => {
        console.log(error.error.error)
        Swal.fire({
        position: 'center',
        icon: 'error',
        title: error.error.error+" : "+error.error.message,
        showConfirmButton: false,
        timer: 1500
      })
      }
    )
  }
}
