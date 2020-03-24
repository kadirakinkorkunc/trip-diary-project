import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';


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
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    //redirect home if already logged in
    if (authenticationService.isLoggedIn()) {
      router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.openSnackBar();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    //get returl url  or redirect to /
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  openSnackBar() {
    const message = "You must be logged in to see content!";
    const action = "OK";
    this._snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'top',
    })
  }

  //easy way to access fields
  get f() { return this.loginForm.controls }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) { return; }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .subscribe(
        success => {
          this.router.navigate([`${this.returnUrl}`]); // this navigation doesnt work or works but doesnt auto refresh the page ??
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
  }

  logout() {
    this.authenticationService.logout();
  }
}
