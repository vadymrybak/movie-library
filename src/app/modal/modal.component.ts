import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';
import Movie from '../model/movie';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() currentMovie: Movie;
  @Output() movieUpdated: EventEmitter<any> = new EventEmitter();
  @Output() ratingUpdated: EventEmitter<any> = new EventEmitter();
  @Output() movieDeleted: EventEmitter<any> = new EventEmitter();

  watch_result$: Subscription;

  constructor(private dataService: DataService) { }

  ngOnInit() {}

  ngOnDestroy() {
    this.watch_result$.unsubscribe();
  }

  chkWatchedToggle(event: Event):void {
    this.watch_result$ = this.dataService.updateWatch(this.currentMovie.id, event.srcElement['checked'])
    .subscribe(
      result => {
        this.movieUpdated.emit(result);
      },
      error => {
        console.log("error", error);
      }); 
  }

  descreaseRating():void {
    if (this.currentMovie.my_rating == 0 )
      return;
    this.currentMovie.my_rating--;
    this.dataService.updateMovieRating(this.currentMovie.id, this.currentMovie.my_rating);
    this.ratingUpdated.emit(this.currentMovie.my_rating);
  };

  increaseRating():void {
    if (this.currentMovie.my_rating == 10 )
      return;
    this.currentMovie.my_rating++;
    this.dataService.updateMovieRating(this.currentMovie.id, this.currentMovie.my_rating);
    this.ratingUpdated.emit(this.currentMovie.my_rating);
  };

  deleteMovie():void {
    const deletion$ = this.dataService.deleteMovie(this.currentMovie.id).subscribe(result => { 
      this.movieDeleted.emit(result);
    });
  }
}
