import { StonkMention } from './../../models/StonkMention';
import { CompanyInfo } from './../../models/CompanyInfo';
import { Trend } from './../../models/Trend';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { StonksService } from 'src/app/services/stonks.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css'],
  providers: [DatePipe]
})
export class TickerComponent implements OnInit {

  // Chart stuff
  public lineChartData: ChartDataSets[] = [{
    data: [],
    label: ''
  }];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: '#0c448c',
      backgroundColor: 'rgba(51, 137, 194, 0.5)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  /**
   * stonk ticker 
   */
  query: string;

  trendTs: Trend[] = [];
  companyInfo: CompanyInfo;
  mentions: StonkMention[] = [];
  mentionsSize: number;

  pageSize: number = 20;
  page: number;
  trendDays: number;

  sources: string[] = ["all"];
  source: string = "all";

  navigationSubscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private datepipe: DatePipe,
    private stonksService: StonksService) { }

  ngOnInit(): void {
    this.trendDays = 30;
    this.stonksService.getMentionSources().subscribe(s => this.sources = this.sources.concat(s));

    this.route.queryParamMap.subscribe(params => {
      this.onRouteChanged(params);
    });
  }

  loadStonk() {    
    this.router.navigate(['/ticker'], { queryParams: { query: this.query, source: this.source } });
  }

  loadAll() {
    this.stonksService.countStonkLatestPosts(this.query, this.source).subscribe(c => {
      this.mentionsSize = c['count'];
      this.loadStonkTrend();
      this.loadStonkMentions(this.page);
      this.loadCompanyInfo();
    });
  }

  loadStonkMentions(page: number) {
    this.page = page;
    this.stonksService.getStonkLatestPosts(this.query, page, this.pageSize, this.source).subscribe(s => this.mentions = s);
  }

  loadStonkTrend() {
    this.stonksService.getStonkMentionTrend(this.query, this.trendDays, this.source).subscribe(t => {
      this.trendTs = t;
      this.lineChartData[0].data = [];
      this.lineChartLabels = [];
      this.trendTs.forEach(trend => {
        const date = new Date(trend.year, trend.month - 1, trend.day);

        this.lineChartData[0].data.push(trend.count);
        this.lineChartData[0].label = this.query + ' mentions';
        this.lineChartLabels.push([this.datepipe.transform(date, 'dd MMM'), `${trend.year}`]);
      });
    });
  }

  loadCompanyInfo() {
    this.stonksService.getCompanyInfo(this.query).subscribe(i => {
      this.companyInfo = i;
    });
  }

  onRouteChanged(params: ParamMap) {
    this.page = 0;
    this.query = params["params"]["query"] || undefined;
    if (params["params"]["source"]) {
      this.source = params["params"]["source"];
    }

    if (this.query) {
      this.loadAll();
    }
  }
}
