import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedService } from '../../_services/feed.service';
import { Post } from '../../_interfaces/Post';
import { AuthenticationService } from '../../_services/authentication.service';
import { Router } from '@angular/router';
import { JWTPayload } from 'src/app/_interfaces/JWTPayload';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main-feed',
  templateUrl: './main-feed.component.html',
  styleUrls: ['./main-feed.component.css']
})
export class MainFeedComponent implements OnInit {
  feed$: Observable<Post[]>;
  loggedInUser: JWTPayload;
  isLoggedIn = false;
  currentPage = 1;
  itemsPerPage = 5;
  pageSize: number
  classForTag = ['label-success', 'label-default', 'label-warning', 'label-success', 'label-danger']

  constructor(private feedService: FeedService, private authService: AuthenticationService, private router: Router) {
    this.isLoggedIn = authService.isLoggedIn();
  }

  ngOnInit(): void {
    //get feed data
    this.getFeed();
    this.getLoggedUser();
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  // get the main data with service
  public getFeed() {
    this.feed$ = this.feedService.getFeed();
  }

  // get the logged in user data
  public getLoggedUser() {
    this.authService.getLoggedInUser().pipe(map(data => {
      this.loggedInUser = data;
    })).subscribe(result => { });;
    console.log("loggedinuser-->", this.loggedInUser);
  }

}
