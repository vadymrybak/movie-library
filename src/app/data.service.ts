import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from "@angular/common/http";
import { Observable }  from "rxjs";
import Movie from "./model/movie";
import Search from "./model/Search";
import {map} from "rxjs/operators";

const links = {
  getMovies: "/data/movies",
  searchMovie: "/data/search",
  watch: "/data/updateWatch"
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

  // Gets all movies from DB
  getMovies(): Observable<Movie[]> {
    return this.http.get(links.getMovies).pipe(
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

}
