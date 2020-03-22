import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { tap, shareReplay } from 'rxjs/operators';
import * as JwtDecode from 'jwt-decode';
import * as moment from 'moment';
import { JWTPayload } from '../_interfaces/JWTPayload';
// logs in and out, notifies other components with subscription
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  URL_API = 'http://localhost:80/api/auth';


  constructor(private http: HttpClient) { }

  private setSession(authResult) {
    const token = authResult.token;
    const payload = <JWTPayload>JwtDecode(token);
    const expiresAt = moment.unix(payload.exp);

    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  get token(): string {
    return localStorage.getItem('token');
  }

  login(username: string, password: string) {
    return this.http.post(`${this.URL_API}/login/`, { username, password })
      .pipe(tap(
        response => {
          console.log("API CALL RESPONSE FOR LOGIN => ", response);
          this.setSession(response);
        }
      ),
        shareReplay(),
      );
  }

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    console.log("CIKIS YAPILDI ");
  }

  refreshToken() {
    if (moment().isBetween(this.getExpiration().subtract(1, 'days'), this.getExpiration())) {
      return this.http.post(
        `${this.URL_API}/refresh-token/`,
        { token: this.token }
      ).pipe(
        tap(response => { this.setSession(response); console.log("response for refresh token=>", response); }),
        shareReplay(),
      ).subscribe();
    }
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    console.log("expires=>", moment(expiresAt).calendar());
    return moment(expiresAt);
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
}
