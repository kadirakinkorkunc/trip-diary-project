import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { DetailedTripComponent } from './feed/detailed-trip/detailed-trip.component'
import { AddTripComponent } from './feed/add-trip/add-trip.component';
import { AuthGuard } from './_helpers/auth.guard';
import { LoginComponent } from './login/login.component';
import { MainFeedComponent } from './feed/main-feed/main-feed.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  { path: 'login', pathMatch: "full", component: LoginComponent },
  {
    path: '', component: FeedComponent, canActivate: [AuthGuard], children: [
      { path: '', component: MainFeedComponent, pathMatch: 'full' },
      { path: 'create', component: AddTripComponent },
      { path: ':post_id', component: DetailedTripComponent },
      {
        path: '**',
        pathMatch: 'full',
        component: NotFoundComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
