import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

// intercepts every api call and adds jwt header to call.
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    console.log("firs token check => ", token);

    if (token) {
      console.log("gecerli token=> ", token)
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'JWT '.concat(token))
      });
      console.log("cloned ->", cloned.body);
      return next.handle(cloned);
    } else {
      console.log("next.handle(req) => ", next.handle(req));
      return next.handle(req);
    }
  }
}
