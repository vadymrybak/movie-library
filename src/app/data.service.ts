import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from "@angular/common/http";
import { Observable, Subscription }  from "rxjs";
import Movie from "./model/movie";
import Search from "./model/Search";
import {map} from "rxjs/operators";

const links = {
  getMovies: "/data/movies",
  searchMovie: "/data/search",
  watch: "/data/updateWatch",
  rating: "/data/updateRating",
  delete: "/data/deleteMovie",
  movieCount: "/data/moviesCount"
};

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  headers: HttpHeaders;

  constructor(private http:HttpClient) {  
    this.headers =new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  // Gets the whole amount of movies in DB
  getMoviesCount(): Observable<number> {
    return this.http.get(links.movieCount).pipe(
      map(res => res['payload'])
    );
  };

  // Gets all movies from DB
  getMovies(startIndex: number, endIndex: number): Observable<Movie[]> {
    const params = new HttpParams()
      .set("startIndex", startIndex.toString())
      .set('endIndex', endIndex.toString());

    return this.http.get(links.getMovies, {params}).pipe(
        map(res => res['payload'])
    );
  };

  // Search movies by provided title
  searchMovie(search: Search): Observable<Movie[]>{
    const params = new HttpParams()
            .set('query', search.query)
            .set('from', search.from === null ? "" : search.from.toString())
            .set('to', search.to === null ? "" : search.to.toString());

    return this.http.get(links.searchMovie, { params }).pipe(
      map(res => res['payload'])
    );
  };

  // Updates movie by id with watched/not watched value
  updateWatch(id: number, watched: boolean): Observable<Object> {
    let toSend = {id, watched};
    return this.http.put(links.watch, toSend, { headers: httpOptions.headers } );
  };

  // Updates movie rating
  updateMovieRating(id: number, rating: number): Subscription {
    let toSend = {id, rating};
    return this.http.put(links.rating, toSend, { headers: httpOptions.headers } ).subscribe();
  };

  // Deletes a movie by id
  deleteMovie(id: number): Observable<Object> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete(links.delete, { headers: httpOptions.headers, params } ).pipe(
      map(res => res['payload'][0])
    );
  };

}
