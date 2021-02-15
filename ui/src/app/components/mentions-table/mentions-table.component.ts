import { StonkMention } from './../../models/StonkMention';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mentions-table',
  templateUrl: './mentions-table.component.html',
  styleUrls: ['./mentions-table.component.css']
})
export class MentionsTableComponent implements OnInit {

  @Input()
  data: StonkMention[];

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
    this.loading = false;
  }

  loadNextPage(page: number) {        
    this.loadNext.emit(page);
  }

}
