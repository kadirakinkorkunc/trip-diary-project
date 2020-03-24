import { Component, OnInit } from '@angular/core';
import { Post } from '../../_interfaces/Post';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FeedService } from 'src/app/_services/feed.service';
import { pipe } from 'rxjs';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {
  postForm: FormGroup
  constructor(private _snackBar:MatSnackBar, private formBuilder: FormBuilder, private feedService: FeedService) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      title: '',
      place: '',
      notes: '',
      start_date: Date,
      end_date: Date
    });
  }
  get f() {
    return this.postForm.controls;
  }

  onSubmit() {
    let pipe = new DatePipe('en-US')
    let start_date = this.f.start_date.value
    let end_date = this.f.end_date.value

    this.postForm.controls['start_date'].setValue(pipe.transform(start_date, 'dd/MM/yyyy'));
    this.postForm.controls['end_date'].setValue(pipe.transform(end_date, 'dd/MM/yyyy'));
    // above part is for django model transformation, django models.DateField doesn't accept the default ng date format.
    // so i redesigned in this part, if i corret to django i must override the base methods so i didn't.

    this.feedService.postFeed(this.postForm.value)
      .subscribe((response) => {
        if ( response.status == 201){
          this.successReturn();
        }else{
          //
        }
        });
  }

  successReturn(){
    const message = "Your journey added to site!";
    const action = "OK";
    this._snackBar.open(message, action, {
      duration: 4000,
    })
  }
}
