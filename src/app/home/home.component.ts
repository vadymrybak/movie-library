import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { DataService } from '../data.service';

import Movie from '../model/movie'; 
import Search from '../model/Search';
import Helper from '../model/helper';

// RxJS
import { Subject,Observable,BehaviorSubject, Subscriber, Subscription } from 'rxjs';
import { tap, map, filter, scan, debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('txtTo') txtTo: ElementRef;
  @ViewChild('txtFrom') txtFrom: ElementRef;
  @ViewChild('search') txtSearch: ElementRef;

  search: Search = new Search("");
  loading: boolean = false;
  mainLoading: boolean = false;

  movies: Array<Movie>;
  currentMovie: Movie;

  movieSubject$: BehaviorSubject<Search>;

  @HostListener('window:scroll', [])
  onScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      console.log("bottom of the page!");
    }
  }

  constructor(private dataService: DataService) {
    this.movieSubject$ = new BehaviorSubject<Search>(this.search); 
  }

  ngOnInit() {
    this.movieSubject$.pipe(
      debounceTime(500),
      switchMap(search => { 
        if (Helper.isEmptySearch(search)){
          this.mainLoading = true;
          return this.dataService.getMovies();
        }
        else{
          this.loading = true;
          return this.dataService.searchMovie(search);
        }
      })
    )
    .subscribe(data => {
      this.mainLoading = false;
      this.loading = false;
      this.movies = data;
    });
  }

  searchInputChanged(value): void{
    this.search.query = value;
    this.movieSubject$.next(this.search);
  }

  processFilter(from, to) {
    this.search.from = from;
    this.search.to = to;
    this.movieSubject$.next(this.search);
    console.log(from, to);
  };

  clearFilter() {
    this.txtTo.nativeElement.value = "";
    this.txtFrom.nativeElement.value = "";
    this.txtSearch.nativeElement.value = "";
    this.search = new Search("");
    this.movieSubject$.next(this.search);
  }

  clicked(event: Movie): void{
    this.currentMovie = event;
  };

  ngOnDestroy() {
    this.movieSubject$.unsubscribe();
  }

  movieUpdated(movie: Movie){
    this.movies.find(movie_arr => movie_arr.id == movie.id).is_watched = movie.is_watched;
  };

}
