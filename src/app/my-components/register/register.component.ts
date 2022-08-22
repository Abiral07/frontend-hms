import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import ConfirmPasswordValidation from 'src/app/customValidators/confirmPassword.validator';
import {User} from "../../dto/user.registration";
import {AuthService} from "../../service/auth.service";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  myControl = new FormControl('');
  genders: string[] = ['MALE', 'FEMALE', 'OTHERS'];
  filteredGenders!: Observable<string[]>;
  public user:User = {
    uid:0,
    userName:'',
    fullName:'',
    email:'',
    mobile:9,
    gender:'',
    dob:new Date(),
    address: {country:'',city:'',state:'',ward:0},
    password:''
  };
  constructor(public authService:AuthService, private _snackBar: MatSnackBar, private router:Router) {
    if(localStorage.getItem('token')!=null){
      this.router.navigate(['/profile']);
    }
    this.registerForm = new FormGroup({
      userName: new FormControl(null,[Validators.required,Validators.minLength(8),Validators.maxLength(50)]),
      fullName: new FormControl(null,[Validators.required,Validators.minLength(8),Validators.maxLength(100)]),
      email: new FormControl(null,[Validators.required,Validators.email]),
      mobile: new FormControl(null,[Validators.required,Validators.pattern("^(\\+\\d{1,3}(-|\\s)?)?(9\\d{9})$")]),
      gender: new FormControl(null,[Validators.required]),
      dob: new FormControl(null,[Validators.required]),
      country: new FormControl("Nepal",[Validators.required]),
      state: new FormControl("Bagmati",[Validators.required]),
      city: new FormControl("Lalitpur",[Validators.required]),
      ward: new FormControl(7,[Validators.required,Validators.maxLength(3)]),
      password: new FormControl(null,[Validators.required,Validators.minLength(8),Validators.maxLength(64),Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]),
      confirmPassword: new FormControl(null,[Validators.required,Validators.minLength(8),Validators.maxLength(64)])
    },
    {
      validators: [ConfirmPasswordValidation.mustMatch('password','confirmPassword')]
    })
  }
  signIn(){
    console.log("regForm: ",this.registerForm.value);
    console.log("control: ",this.myControl.value);
    console.log("user: ",this.user)
    this.authService.addUser(this.user).subscribe(
      (data)=>{
        //success
        this._snackBar.open(`Registration Success!!`, 'X', {
          horizontalPosition: "right",
          verticalPosition: "top",
          duration: 5 * 1000,
          panelClass:['success-snackbar']
        });
        this.router.navigate(['/login']);
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

  ngOnInit() {
    this.filteredGenders = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (value ? this._filter(value) : this.genders.slice())),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.genders.filter(gender => gender.toLowerCase().includes(filterValue));
  }

}
