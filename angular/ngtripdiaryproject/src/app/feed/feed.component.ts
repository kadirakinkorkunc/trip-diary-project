import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedService } from '../services/feed.service';
import { Post } from '../interfaces/Post';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  feed$: Observable<Post[]>;

  constructor(private feedService: FeedService) { }

  ngOnInit(): void {

    //get feed data
    this.getFeed();
  }

  public getFeed(){
    this.feed$ = this.feedService.getFeed();
  }

}
