import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import {AuthService} from "../../service/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService,private userService: UserService, private _snackBar: MatSnackBar, private router: Router) {
    if(localStorage.getItem('token')!=null){
      this.router.navigate(['/home'])
    }
    this.loginForm = new FormGroup({
      userName: new FormControl(null,[Validators.required,Validators.maxLength(50)]),
      password: new FormControl(null,[Validators.required,Validators.minLength(8)])
    })
   }
  ngOnInit(): void {
  }

  login(){
    let roles:Array<string>=[];
    console.log(this.loginForm.value);
    this.authService.logUser(this.loginForm.value).subscribe(
      (data:any)=>{
        this._snackBar.open('Login Successful !!!!', 'X', {
          horizontalPosition: "right",
          verticalPosition: "top",
          duration: 5 * 1000,
          panelClass:['success-snackbar']
        });
        //extracting user roles into an array
        for(var index of data.roles){
          roles.push(index.authority);
        }
        this.authService.saveDetails(data.token,roles);
        this.userService.getCurrentUser().subscribe(
          (data)=>{sessionStorage.setItem('user',JSON.stringify(data));
            this.authService.loginStatus.next(true)},
          error => {
            this.authService.logOut();
            alert("Failed to load userDetails.Try Again");}
        )
        roles.includes("ROLE_ADMIN")?
          this.router.navigate(['/dashboard']):
          this.router.navigate(['/home']);

      },
      error => {
        this._snackBar.open(`${error.error.error}`, 'X', {
          horizontalPosition: "right",
          verticalPosition: "top",
          duration: 5 * 1000,
          panelClass:['danger-snackbar']
        });
        console.log(error)
      }
    )
  }
}
