import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FeedService } from 'src/app/_services/feed.service';
import { Post } from '../../_interfaces/Post'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-detailed-trip',
  templateUrl: './detailed-trip.component.html',
  styleUrls: ['./detailed-trip.component.css']
})
export class DetailedTripComponent implements OnInit {
  post_id: any
  post: Post
  constructor( private activatedRoute: ActivatedRoute, private feedService: FeedService) { }

  ngOnInit(): void {
    this.post_id = this.activatedRoute.snapshot.params['post_id'];
    this.getPost();
  }

  public getPost() {
    this.feedService.retrievePost(this.post_id).pipe(map(data => {
      this.post = data;
    })).subscribe(result => { });
  }
}
