import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

// prevent unauth users from accessing restricted routes with getting help from canActivate interface that lets guard decide a 
// route can be activated with the canActivate()
// its attaches to app.routing.ts
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  returnUrl: string;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticationService.isLoggedIn()) {
      console.log("isLoggedinCalisti ve true dondu");
      this.authenticationService.refreshToken();
      return true
    } else {
      //not logged in case ->redirect login page with return url
      this.authenticationService.logout();
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return true
    }
  }


}
