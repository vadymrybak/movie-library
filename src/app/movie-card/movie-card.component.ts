import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {
  @HostBinding('class.col-12') col_xs: boolean = true;
  @HostBinding('class.col-sm-6') col_sm: boolean = true;
  @HostBinding('class.col-md-4') col_md: boolean = true;
  @HostBinding('class.col-lg-3') col_lg: boolean = true;
  @Input() movieName: string;

  constructor() { }

  ngOnInit() {
  }

}
