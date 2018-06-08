import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import Movie from '../model/movie'; 

// RxJS
import { Subject,Observable,BehaviorSubject, Subscriber } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: Array<Movie>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    const movies$ = this.dataService.getMovies().subscribe(data => {
      this.movies = data;
    });
  }

}
