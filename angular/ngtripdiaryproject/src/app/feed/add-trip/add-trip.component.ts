import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Tag } from 'src/app/_interfaces/Tag';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FeedService } from 'src/app/_services/feed.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  seperatorKeyCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>
  tags: string[] = []; // this is the input container
  allTags: string[] = [];
  postForm: FormGroup
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private _snackBar: MatSnackBar, private formBuilder: FormBuilder, private feedService: FeedService) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
  }
  ngOnInit(): void {
    this.getTagsForInput()
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.minLength(5), Validators.required]],
      place: ['', [Validators.minLength(5), Validators.required]],
      notes: ['', [Validators.minLength(250), Validators.required]],
      tags: [[], [Validators.required]],
      start_date: [Date, Validators.required],
      end_date: [Date, Validators.required],
    });
  }

  //gets all tags from sv to show in autocomplete 
  public getTagsForInput() {
    this.feedService.getTagsForChips().subscribe((response) => {
      response.forEach(tagobj => {
        this.allTags.push(tagobj.name);
      });
      this.postForm.controls['tags'].setValue(this.tags);
    })
  }

  // add tag to list
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }


    this.tagCtrl.setValue(null);
  }

  //remove tag from the list
  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }


  // selected items in tags
  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }


  // tag filter
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }


  // helper for postForm formgroup
  get f() {
    return this.postForm.controls;
  }


  // post "post" event handler
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
        if (response.status == 201) {
          this.successReturn();
        } else {
          //
        }
      });
  }


  // after submit situation reflex
  successReturn() {
    const message = "Your journey added to site!";
    const action = "OK";
    this._snackBar.open(message, action, {
      duration: 4000,
    })
  }
}
