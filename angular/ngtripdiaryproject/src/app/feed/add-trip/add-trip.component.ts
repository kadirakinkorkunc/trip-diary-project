import { Component, OnInit } from '@angular/core';
import { Post } from '../../interfaces/Post';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FeedService } from 'src/app/services/feed.service';
@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {
  postForm: FormGroup
  constructor(private formBuilder: FormBuilder, private feedService: FeedService) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      title: '',
      place: '',
      notes: '',
      start_date: '',
      end_date: ''
    });
  }

  onSubmit() {
    this.feedService.postFeed(this.postForm.value)
      .subscribe((response) => { console.log(response) });
  }
}
