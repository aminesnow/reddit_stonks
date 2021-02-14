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

  @Input()
  page: number;

  @Input()
  pageSize: number;

  @Input()
  collectionSize: number;

  @Output()
  loadNext = new EventEmitter();

  @Input()
  loading: boolean;

  constructor() { }

  ngOnInit(): void {
    if (!this.pageSize) {
      this.pageSize = 20;
    }
    this.page = 1;
    this.loading = false;
  }

  loadNextPage(page: number) {
    this.loadNext.emit(page);
  }

}
