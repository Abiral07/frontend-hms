import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import ConfirmPasswordValidation from "../../../customValidators/confirmPassword.validator";
import {map, startWith} from "rxjs/operators";
import {UserService} from "../../../service/user.service";
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  updateForm: FormGroup;
  myControl = new FormControl('');
  genders: string[] = ['MALE', 'FEMALE', 'OTHERS'];
  filteredGenders!: Observable<string[]>;
  user: any;
  uid?: any;

  constructor(public authService:AuthService,public userService: UserService, private _snackBar: MatSnackBar, private router: Router, private activatedRoute: ActivatedRoute) {
    let u = JSON.parse(localStorage.getItem('user')!);
    if(this.authService.isAdmin()){
      this.uid = parseInt(<string>this.activatedRoute.snapshot.params['uid']);
    }else {
      this.uid = u.uid;
      this.router.navigate([`/updateUser/${this.uid}`])
        .then(() => {
          console.log("success")
        })
        .catch((err:any) => {
          console.log("error occurred while navigating", err);
        });
    }
    console.log(this.uid)
    this.updateForm = new FormGroup({
        userName: new FormControl(null, [Validators.minLength(8), Validators.maxLength(50)]),
        fullName: new FormControl(null, [Validators.minLength(8), Validators.maxLength(100)]),
        email: new FormControl(null, [Validators.email]),
        mobile: new FormControl(null, [Validators.pattern("^(\\+\\d{1,3}(-|\\s)?)?(9\\d{9})$")]),
        gender: new FormControl(null, []),
        dob: new FormControl(null, []),
        country: new FormControl(null, []),
        state: new FormControl(null, []),
        city: new FormControl(null, []),
        ward: new FormControl(null, [Validators.maxLength(3)]),
        password: new FormControl(null, [Validators.minLength(8), Validators.maxLength(64), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]),
        confirmPassword: new FormControl(null, [Validators.minLength(8), Validators.maxLength(64)])
      },
      {
        validators: [ConfirmPasswordValidation.mustMatch('password', 'confirmPassword')]
      })
  }

  ngOnInit():void {
    console.log('uid:', this.uid)
    this.userService.getUserById(this.uid).subscribe(
      (data: any) => {
        console.log(data);
        this.user = data;
      }
    );
    this.filteredGenders = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (value ? this._filter(value) : this.genders.slice())),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.genders.filter(gender => gender.toLowerCase().includes(filterValue));
  }

  update() {
    console.log(this.updateForm.value);
    let userdata = this.updateForm.value
    userdata =this.mapFormFieldToUser(userdata);
    this.userService.updateUser(userdata,this.uid).subscribe(
      (data) => {
        //success
        this._snackBar.open(`Update Successful!!`, 'X', {
          horizontalPosition: "right",
          verticalPosition: "top",
          duration: 5 * 1000,
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/']);
      },
      error => {
        this._snackBar.open(`${error.error.error}`, 'X', {
          horizontalPosition: "right",
          verticalPosition: "top",
          duration: 5 * 1000,
          panelClass: ['danger-snackbar']
        });
      }
    )
  }


  private mapFormFieldToUser(user: any) {
    return {
      userName: user.userName,
      fullName: user.fullName,
      email: user.email,
      mobile: user.mobile,
      gender: user.gender,
      dob: user.dob,
      address: {
        country: user.country,
        state: user.state,
        city: user.city,
        ward: user.ward
      }
    };
  }
}
