import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';
import Movie from '../model/movie';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() currentMovie: Movie;
  @Output() movieUpdated: EventEmitter<any> = new EventEmitter();
  @Output() ratingUpdated: EventEmitter<any> = new EventEmitter();

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  chkWatchedToggle(event: Event) {
    const watch_result$ = this.dataService.updateWatch(this.currentMovie.id, event.srcElement['checked']).subscribe(result => {
      this.movieUpdated.emit(result);
    }); 
  }

  descreaseRating(){
    if (this.currentMovie.my_rating == 0 )
      return;
    this.currentMovie.my_rating--;
    this.ratingUpdated.emit(this.currentMovie.my_rating);
  };

  increaseRating(){
    if (this.currentMovie.my_rating == 10 )
      return;
    this.currentMovie.my_rating++;
    this.ratingUpdated.emit(this.currentMovie.my_rating);
  };
}
