import { StonksService } from './../../services/stonks.service';
import { TopStonks } from './../../models/TopStonks';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pageSize: number = 5;

  dayTop: TopStonks[] = [];
  dayTopSize: number;
  weekTop: TopStonks[] = [];
  weekTopSize: number;
  fortnightTop: TopStonks[] = [];
  fortnightTopSize: number;
  monthTop: TopStonks[] = [];
  monthTopSize: number;

  constructor(private stonksService: StonksService ) { }

  ngOnInit(): void {

    this.stonksService.countTopStonks(1).subscribe(c => {
      this.dayTopSize = c['count'];      
      this.loadDayTop(1);
    });

    this.stonksService.countTopStonks(7).subscribe(c => {
      this.weekTopSize = c['count'];
      this.loadWeekTopTop(1);
    });

    this.stonksService.countTopStonks(14).subscribe(c => {
      this.fortnightTopSize = c['count'];
      this.loadDortnightTopTop(1);
    });

    this.stonksService.countTopStonks(30).subscribe(c => {      
      this.monthTopSize = c['count'];
      this.loadMonthTop(1);
    });
  }

  loadDayTop(page: number) {
    this.stonksService.getTopStonks(1, page-1, this.pageSize).subscribe(s => this.dayTop = s);
  }

  loadWeekTopTop(page: number) {
    this.stonksService.getTopStonks(7, page-1, this.pageSize).subscribe(s => this.weekTop = s);
  }

  loadDortnightTopTop(page: number) {
    this.stonksService.getTopStonks(14, page-1, this.pageSize).subscribe(s => this.fortnightTop = s);
  }

  loadMonthTop(page: number) {
    this.stonksService.getTopStonks(30, page-1, this.pageSize).subscribe(s => this.monthTop = s);
  }
}
