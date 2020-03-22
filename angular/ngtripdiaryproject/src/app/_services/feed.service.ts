import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Post } from '../_interfaces/Post';
@Injectable({
  providedIn: 'root'
})
export class FeedService {
  API_URL = 'http://localhost:80'
  constructor(private httpClient: HttpClient) { }

  public getFeed(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.API_URL}/api/feed/`);
  }

  public retrievePost(post_id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.API_URL}/api/feed/${post_id}`)
  }

  public postFeed(post: Post) {
    return this.httpClient.post(`${this.API_URL}/api/feed/`, post)
  }
}
