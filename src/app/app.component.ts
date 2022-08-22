import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username = 'frontend-hms';
  sidebar: boolean = false;

  toggleSidebar(){
    if(sessionStorage.getItem('roles')!=null)
      this.sidebar = !this.sidebar;
  }
}
