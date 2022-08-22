import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../service/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router:Router, private authService:AuthService,private _snackBar: MatSnackBar) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isLoggedIn() && this.authService.isAdmin()){
      return true;
    }
    this._snackBar.open("Invalid Access!!!",'X',{
      horizontalPosition: "right",
      verticalPosition: "top",
      duration: 3 * 1000,
      panelClass:['success-snackbar']
    })
    this.router.navigate(['/home']);
    return false;
  }

}
