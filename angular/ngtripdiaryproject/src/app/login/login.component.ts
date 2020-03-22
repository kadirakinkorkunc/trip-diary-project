import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    //redirect home if already logged in
    if (authenticationService.isLoggedIn()) {
      console.log("isLoggedIn() => already logged in")
      router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    //get returl url  or redirect to /
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  //easy way to access fields
  get f() { return this.loginForm.controls }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) { console.log("if code block => invalid credentials"); return; }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .subscribe(
        success => {
          console.log("succesfull login ->", this.returnUrl);
          this.router.navigate([`${this.returnUrl}`]); // this navigation doesnt work or works but doesnt auto refresh the page ??
        },
        error => {
          this.error = error;
          this.loading = false;
          console.log("errors =>", error);
        }
      );
  }

  logout() {
    this.authenticationService.logout();
  }
}
