import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Post } from '../_interfaces/Post';
import { Tag } from '../_interfaces/Tag';
@Injectable({
  providedIn: 'root'
})
export class FeedService {
  API_URL = 'http://localhost:90'
  constructor(private httpClient: HttpClient) { }

  // get tags for creation form input chips
  public getTagsForChips(): Observable<Tag[]> {
    return this.httpClient.get<Tag[]>(`${this.API_URL}/api/feed/tags`);
  }


  // get feed from sv
  public getFeed(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.API_URL}/api/feed/`);
  }


  // retrieve spesific feed item from sv with object id
  public retrievePost(post_id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.API_URL}/api/feed/${post_id}`)
  }


  // post a "post" to sv
  public postFeed(post: Post) {
    return this.httpClient.post(`${this.API_URL}/api/feed/`, post, { observe: 'response' })
  }
}
