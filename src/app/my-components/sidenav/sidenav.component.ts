import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  step?: number;
  isAdmin?: boolean;
  uid?:number;

  setStep(index: number) {
    this.step = index;
  }

  constructor(private authService: AuthService,private userService:UserService) {
    this.isAdmin = this.authService.isAdmin();
    this.authService.loginStatus.asObservable().subscribe(
      (data) => {
        if(data==true){
          this.uid=this.userService.getUserDetails().uid;
          this.isAdmin = this.authService.isAdmin();
        }
      });
  }

  ngOnInit(): void {
    this.uid=this.userService.getUserDetails().uid;
    console.log(this.uid);
  }
}
