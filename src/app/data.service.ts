import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from "@angular/common/http";
import { Observable }  from "rxjs";
import Movie from "./model/movie";
import {map} from "rxjs/operators";

const links = {
  getMovies: "/data/movies"

};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  headers: HttpHeaders;

  constructor(private http:HttpClient) {  
    this.headers =new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get(links.getMovies).pipe(
        map(res => res['payload'])
    );
};

}
