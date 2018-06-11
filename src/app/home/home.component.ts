import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormControl } from '@angular/forms';

import Movie from '../model/movie'; 


// RxJS
import { Subject,Observable,BehaviorSubject, Subscriber, Subscription } from 'rxjs';

import { tap, map, filter, scan, debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  search:string = "";
  loading: boolean = false;
  mainLoading: boolean = false;

  movies: Array<Movie>;
  movies$: Subscription;

  movieSubject$ = new BehaviorSubject<string>(""); 

  constructor(private dataService: DataService) { }

  ngOnInit() {

    this.movieSubject$.pipe(
      debounceTime(500),
      switchMap(search => { 
        if (search === ""){
          this.mainLoading = true;
          return this.dataService.getMovies();
        }
        else{
          this.loading = true;
          return this.dataService.searchMovie(search);
        }
      }),
      tap((value) => {
        
      }),
    )
    .subscribe(data => {
      this.mainLoading = false;
      this.loading = false;
      this.movies = data;
    });

  }

  searchInputChanged(value): void{
    this.movieSubject$.next(value);
  }

  ngOnDestroy() {
    this.movies$.unsubscribe();
  }

}
