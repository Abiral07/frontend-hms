import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user?: any;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(
      (data) => {
        localStorage.setItem('user', JSON.stringify(data));
        console.log(data)
        this.user = data;
      }, (error: any) => {
        alert(error.error.error + ":   " + error.error.message);
      });
  }
}
