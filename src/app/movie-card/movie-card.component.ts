import { Component, OnInit, Input, HostBinding } from '@angular/core';
import Movie from '../model/movie';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {
  @HostBinding('class.col-12') col_xs: boolean = true;
  @HostBinding('class.col-sm-4') col_sm: boolean = true;
  @HostBinding('class.col-md-2') col_md: boolean = true;
  @HostBinding('class.col-lg-2') col_lg: boolean = true;

  @Input() movie: Movie;

  constructor() { }

  ngOnInit() {
  }

}
