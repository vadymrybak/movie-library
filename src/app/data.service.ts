import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from "@angular/common/http";
import { Observable }  from "rxjs";
import Movie from "./model/movie";
import {map} from "rxjs/operators";

const links = {
  getMovies: "/data/movies",
  searchMovie: "/data/search"
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  headers: HttpHeaders;

  constructor(private http:HttpClient) {  
    this.headers =new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  // Gets all movies from DB
  getMovies(): Observable<Movie[]> {
    return this.http.get(links.getMovies).pipe(
        map(res => res['payload'])
    );
  };

  // Search movies by provided title
  searchMovie(title: string): Observable<Movie[]>{
    const params = new HttpParams()
            .set('query', title);

    return this.http.get(links.searchMovie, { params }).pipe(
      map(res => res['payload'])
  );
  };

}
