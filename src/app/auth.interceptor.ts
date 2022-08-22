import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Observable } from "rxjs";
import {Injectable} from "@angular/core";

const TOKEN_HEADER="Authorization"

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    //Add token from localstorage to header
    let authReq=req;
    const token=sessionStorage.getItem('token');
    if(token!=null){
       authReq=authReq.clone({
         setHeaders:{Authorization:`Bearer ${token}`},
       });
    }
    return next.handle(authReq);
  }
}
export const authInterceptorProvider=[
  {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  }
]
