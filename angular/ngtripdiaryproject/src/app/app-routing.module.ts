import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { DetailedTripComponent } from './feed/detailed-trip/detailed-trip.component'
import { AddTripComponent } from './feed/add-trip/add-trip.component';

const routes: Routes = [
  { path: '', component: FeedComponent },
  { path: 'create', component: AddTripComponent },
  { path: ':post_id', component: DetailedTripComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
