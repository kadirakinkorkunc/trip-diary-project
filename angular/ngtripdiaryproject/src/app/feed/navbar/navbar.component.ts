import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { RouteReuseStrategy, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn= false;
  constructor(
    private authService:AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  

}
