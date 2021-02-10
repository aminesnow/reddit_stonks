import { Component, OnInit } from '@angular/core';
import { TopStonks } from 'src/app/models/TopStonks';
import { StonksService } from 'src/app/services/stonks.service';

@Component({
  selector: 'app-all-stonks',
  templateUrl: './all-stonks.component.html',
  styleUrls: ['./all-stonks.component.css']
})
export class AllStonksComponent implements OnInit {

  pageSize: number = 10;
  period: number;

  stonks: TopStonks[] = [];
  stonksSize: number;

  SOURCES = ["all", "wallstreetbets", "investing", "stocks"];
  source: string = "all";

  constructor(private stonksService: StonksService) { }

  ngOnInit(): void {
    this.period = 1;
    this.stonksService.countTopStonks(this.period, this.source).subscribe(c => {
      this.stonksSize = c['count'];      
      this.loadStonks(this.period);
    });
  }

  loadStonks(page: number) {    
    this.stonksService.getTopStonks(this.period, page-1, this.pageSize, this.source).subscribe(s => this.stonks = s);
  }

}
