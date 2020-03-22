import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedService } from '../../_services/feed.service';
import { Post } from '../../_interfaces/Post';
import { AuthenticationService } from '../../_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-feed',
  templateUrl: './main-feed.component.html',
  styleUrls: ['./main-feed.component.css']
})
export class MainFeedComponent implements OnInit {
  feed$: Observable<Post[]>;
  isLoggedIn = false;
  
  constructor(private feedService: FeedService, private authService: AuthenticationService, private router: Router) { 
    this.isLoggedIn = authService.isLoggedIn();
  }

  ngOnInit(): void {
    //get feed data
    this.getFeed();
  }

  // get the main data with service
  public getFeed() {
    this.feed$ = this.feedService.getFeed();
  }

 

}
