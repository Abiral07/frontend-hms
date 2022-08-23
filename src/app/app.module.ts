import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './my-components/login/login.component';
import { RegisterComponent } from './my-components/register/register.component';
import { HomeComponent } from './my-components/home/home.component';
import { DashboardComponent } from './my-components/dashboard/dashboard.component';
import { ContactComponent } from './my-components/contact/contact.component';
import { ReservationComponent } from './my-components/reservation/reservation.component';
import { NavbarComponent } from './my-components/navbar/navbar.component';
import { SidenavComponent } from './my-components/sidenav/sidenav.component';
import {HttpClientModule} from "@angular/common/http";
import {authInterceptorProvider} from "./auth.interceptor";
import { ProfileComponent } from './my-components/user/profile/profile.component';
import { UpdateUserComponent } from './my-components/user/update-user/update-user.component';
import { ListUserComponent } from './my-components/user/list-user/list-user.component';
import {MatSortModule} from "@angular/material/sort";
import { ChangePasswordComponent } from './my-components/user/change-password/change-password.component';
import { ListRoomComponent } from './my-components/room/list-room/list-room.component';
import { AddRoomComponent } from './my-components/room/add-room/add-room.component';
import { UpdateRoomComponent } from './my-components/room/update-room/update-room.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ContactComponent,
    ReservationComponent,
    NavbarComponent,
    SidenavComponent,
    ProfileComponent,
    UpdateUserComponent,
    ListUserComponent,
    ChangePasswordComponent,
    ListRoomComponent,
    AddRoomComponent,
    UpdateRoomComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        NgbModule,
        HttpClientModule,
        MatSortModule
    ],
  providers: [authInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
