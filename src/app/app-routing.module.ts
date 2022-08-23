import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './my-components/home/home.component';
import { LoginComponent } from './my-components/login/login.component';
import { RegisterComponent } from './my-components/register/register.component';
import {DashboardComponent} from "./my-components/dashboard/dashboard.component";
import {ProfileComponent} from "./my-components/user/profile/profile.component";
import {ListUserComponent} from "./my-components/user/list-user/list-user.component";
import {UpdateUserComponent} from "./my-components/user/update-user/update-user.component";
import {AdminGuard} from "./guard/admin.guard";
import {ChangePasswordComponent} from "./my-components/user/change-password/change-password.component";
import {ListRoomComponent} from "./my-components/room/list-room/list-room.component";
import {AddRoomComponent} from "./my-components/room/add-room/add-room.component";
import {UpdateRoomComponent} from "./my-components/room/update-room/update-room.component";

const routes: Routes = [
  {path:"", redirectTo:"home", pathMatch:"full"},
  {path:"home", component: HomeComponent},
  {path:"dashboard", component: DashboardComponent,canActivate:[AdminGuard]},
  {path:"register", component: RegisterComponent},
  {path:"login", component: LoginComponent},
  {path:"profile", component: ProfileComponent},
  {path:"getAllUser", component: ListUserComponent,canActivate:[AdminGuard]},
  {path:"updateUser/:uid", component: UpdateUserComponent},
  {path:"changePassword/:uid", component: ChangePasswordComponent},
  {path:"getAllRoom", component: ListRoomComponent},
  {path:"addRoom", component: AddRoomComponent},
  {path:"updateRoom", component: UpdateRoomComponent}
  // {path:"BookRoom", component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
