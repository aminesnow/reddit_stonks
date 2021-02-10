import { TopStonks } from './../../models/TopStonks';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-top-stonks',
  templateUrl: './top-stonks.component.html',
  styleUrls: ['./top-stonks.component.css']
})
export class TopStonksComponent implements OnInit {

  @Input()
  data: TopStonks[];

  @Input()
  title: string;

  page: number;

  @Input()
  pageSize: number = 20;

  @Input()
  collectionSize: number;

  @Output()
  loadNext = new EventEmitter();

  constructor() { }

  ngOnInit(): void {   
    this.page = 1; 
  }

  loadNextPage(page: number) {
    this.loadNext.emit(page);
  }

}
