import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedComponent } from './feed/feed.component';
import { AddTripComponent } from './feed/add-trip/add-trip.component';
import { LoginComponent } from './login/login.component';
import { DetailedTripComponent } from './feed/detailed-trip/detailed-trip.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './_helpers/auth.guard';
import { AuthenticationService } from './_services/authentication.service';
import { AuthInterceptor } from './_helpers/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './feed/navbar/navbar.component';
import { MainFeedComponent } from './feed/main-feed/main-feed.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    AddTripComponent,
    LoginComponent,
    DetailedTripComponent,
    NavbarComponent,
    MainFeedComponent,
    NotFoundComponent,


  ],
  imports: [
    MatDialogModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
