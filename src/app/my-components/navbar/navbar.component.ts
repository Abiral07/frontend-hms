import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() sidebarToggle: EventEmitter<any> = new EventEmitter();
  loginStatus?: boolean;

  constructor(private authService: AuthService) {
    this.loginStatus = this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    this.authService.loginStatus.asObservable().subscribe(
      (data) => {
        this.loginStatus = data;
      });
  }

  onClickBurger() {
    this.sidebarToggle.emit();
  }

  logout() {
    this.authService.logOut();
  }
}
