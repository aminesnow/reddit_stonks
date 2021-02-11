import { StonkMention } from './../../models/StonkMention';
import { CompanyInfo } from './../../models/CompanyInfo';
import { Trend } from './../../models/Trend';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StonksService } from 'src/app/services/stonks.service';

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css']
})
export class TickerComponent implements OnInit {

  /**
   * stonk ticker 
   */
  query: string;
  stonkTitle: string;

  trendTs: Trend[] = [];
  companyInfo: CompanyInfo;
  mentions: StonkMention[] = [];

  pageSize: number = 20;
  page: number;
  trendDays: number;

  sources: string[] = ["all"];
  source: string = "all";

  constructor(
    private Activatedroute: ActivatedRoute,
    private route: ActivatedRoute,
    private stonksService: StonksService) { }

  ngOnInit(): void {
    this.trendDays = 30;
    this.page = 0;
    this.stonksService.getMentionSources().subscribe(s => this.sources.concat(s));

    //this.route.paramMap.subscribe(params => this.onRouteChanged(params)),

    this.Activatedroute.queryParamMap.subscribe(params => {
      this.query = params.get('symbol') || undefined;
      this.loadAll();
    });
  }

  loadStonk() {
    console.log(this.query);
  }

  loadAll() {
    this.loadStonkTrend();
    this.loadStonkMentions(this.page);
    this.loadCompanyInfo();
  }

  loadStonkMentions(page: number) {
    this.page = page;
    this.stonksService.getStonkLatestPosts(this.query, page, this.pageSize).subscribe(s => this.mentions = s);
  }

  loadStonkTrend() {
    this.stonksService.getStonkMentionTrend(this.query, this.trendDays,).subscribe(t => this.trendTs = t);
  }

  loadCompanyInfo() {
    this.stonksService.getCompanyInfo(this.query).subscribe(i => this.companyInfo = i);
  }

  /*onRouteChanged(ticker: string) {
    this.
    this.loadAll();
  }*/
}
