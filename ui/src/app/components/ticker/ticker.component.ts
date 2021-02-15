import { StonkMention } from './../../models/StonkMention';
import { CompanyInfo } from './../../models/CompanyInfo';
import { Trend } from './../../models/Trend';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { StonksService } from '../../../app/services/stonks.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { AutocompleteCompany } from '../../../app/models/AutocompleteCompany';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css'],
  providers: [DatePipe]
})
export class TickerComponent implements OnInit {

  barChartsLayout = {
    barmode: 'group',
    xaxis: {
      type: 'category',
    }
  };

  revenueProfit = {
    data: [],
    layout: {
      ...this.barChartsLayout,
      title: "Total Revenue VS Total expenses VS Gross Profit"
    }
  };

  incomeExpenses = {
    data: [],
    layout: {
      ...this.barChartsLayout,
      title: "Pretaxe Income VS Total Debt"
    }
  };

  priceAction = {
    data: [],
    layout: {
      dragmode: 'zoom',
      showlegend: false,
      xaxis: {
        type: 'date',
        rangebreaks: [
          { pattern: 'day of week', bounds: [6, 1] },
          { pattern: 'hour', bounds: [24, 10] }
        ],
        rangeslider: {
          visible: true
        }
      },
      title: '',
    }
  };

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

  /**
   * stonk ticker 
   */
  query: string;

  trendTs: Trend[] = [];
  companyInfo: CompanyInfo;
  mentions: StonkMention[] = [];
  mentionsSize: number;

  pageSize: number = 10;
  page: number;
  period: number;

  sources: string[] = ["all"];
  source: string = "all";

  searching = false;
  searchFailed = false;

  autocompleteCompany: AutocompleteCompany;

  loading: boolean;

  updatingWatchlist: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private datepipe: DatePipe,
    private toastService: ToastService,
    private stonksService: StonksService) { }

  ngOnInit(): void {
    this.period = 30;
    this.stonksService.getMentionSources().subscribe(s => this.sources = this.sources.concat(s));

    this.route.queryParamMap.subscribe(params => {
      this.onRouteChanged(params);
    });
  }

  addToWatchlist() {
    this.updatingWatchlist = true;
    this.stonksService.addToWatchlist(this.query).subscribe(comp => {
      this.companyInfo = comp;
      this.updatingWatchlist = false;
      this.toastService.show(`${this.query} is added to the watch list`, { classname: 'bg-success text-light' });
    });
  }

  removeFromWatchlist() {
    this.updatingWatchlist = true;
    this.stonksService.removeFromWatchlist(this.query).subscribe(comp => {
      this.companyInfo = comp;
      this.updatingWatchlist = false;
      this.toastService.show(`${this.query} is removed from the watch list`, { classname: 'bg-danger text-light' });
    });
  }

  searchFormatter = (x: AutocompleteCompany) => `${x.longName} (${x.ticker})`;

  autocomplete = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.stonksService.autocompleteCompanies(term)
          .pipe(
            tap(hints => {
              this.searchFailed = false;
              //this.query = hints[0].ticker;
            }),
            catchError(() => {
              this.searchFailed = true;
              return of([]);
            }))
      ),
      tap(() => this.searching = false)
    );

  onAutocompleteSelect(event: NgbTypeaheadSelectItemEvent) {
    this.query = event.item['ticker'];
    this.loadStonk();
  }

  loadStonk() {
    this.router.navigate(['/ticker'], { queryParams: { query: this.query, source: this.source, period: this.period } });
  }

  loadAll() {
    this.stonksService.countStonkLatestPosts(this.query, this.source).subscribe(c => {
      this.mentionsSize = c['count'];
      this.loadStonkTrend();
      this.loadStonkMentions(this.page);
      this.loadCompanyInfo();
      this.loadPriceAction();
      this.loadFinancials();
    });
  }

  loadStonkMentions(page: number) {
    this.loading = true;
    this.page = page;
    
    this.stonksService.getStonkLatestPosts(this.query, page-1, this.pageSize, this.source).subscribe(s => {
      this.loading = false;
      this.mentions = s
    });
  }

  loadStonkTrend() {
    this.stonksService.getStonkMentionTrend(this.query, this.period, this.source).subscribe(t => {
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
      this.autocompleteCompany = {
        longName: i.longName,
        ticker: i.symbol
      };
    });
  }

  loadPriceAction() {
    const date = new Date();
    const endTs = Math.floor(date.getTime() / 1000);

    let dateOffset = (24 * 60 * 60 * 1000) * this.period;
    let startDate = new Date();
    startDate.setTime(startDate.getTime() - dateOffset);

    const startTs = Math.floor(startDate.getTime() / 1000);

    this.stonksService.getPriceAction(this.query, startTs, endTs).subscribe(data => {
      if (data && data["chart"] && data["chart"]["result"]) {
        const prices = data["chart"]["result"][0]["indicators"]["quote"][0];
        const dates = data["chart"]["result"][0]["timestamp"].map(ts => new Date(ts * 1000));
        this.priceAction.data = [{
          x: dates,
          close: prices["close"],
          high: prices["high"],
          low: prices["low"],
          open: prices["open"],
          decreasing: { line: { color: 'rgba(215, 85, 65, 1)' } },
          increasing: { line: { color: 'rgba(80, 160, 115, 1)' } },
          line: { width: 1.5 },
          type: 'candlestick',
          xaxis: 'x',
          yaxis: 'y'
        }];

        this.priceAction.layout.title = this.query + ' price';
      }

    });
  }

  loadFinancials() {
    this.stonksService.getFinancials(this.query).subscribe((datas: any) => {

      if (datas["timeseries"] && datas["timeseries"]["result"]) {

        datas = datas["timeseries"]["result"];

        // Total revenue
        const totalRevenue = datas
          .filter(data => data["annualTotalRevenue"] || data["trailingTotalRevenue"])
          .map(data => data["annualTotalRevenue"] || data["trailingTotalRevenue"].slice(-1))
          .flat(1)
          .filter(data => data)
          .map(data => {
            data["date"] = new Date(data["asOfDate"]);
            return data;
          })
          .sort((a, b) => {
            return (a["date"].getTime() - b["date"].getTime());
          })
          .reduce((acc, curr) => {
            if (!acc["x"].includes(curr["asOfDate"])) {
              acc["x"].push(curr["asOfDate"]);
              acc["y"].push(curr["reportedValue"]["raw"]);
            }
            return acc;
          }, {
            x: [],
            y: [],
            name: "Total Revenue",
            type: "bar"
          });

        // Gross Profit
        const grossProfit = datas
          .filter(data => data["annualGrossProfit"] || data["trailingGrossProfit"])
          .map(data => data["annualGrossProfit"] || data["trailingGrossProfit"].slice(-1))
          .flat(1)
          .filter(data => data)
          .map(data => {
            data["date"] = new Date(data["asOfDate"]);
            return data;
          })
          .sort((a, b) => {
            return (a["date"].getTime() - b["date"].getTime());
          })
          .reduce((acc, curr) => {
            if (!acc["x"].includes(curr["asOfDate"])) {
              acc["x"].push(curr["asOfDate"]);
              acc["y"].push(curr["reportedValue"]["raw"]);
            }
            return acc;
          }, {
            x: [],
            y: [],
            name: "Gross Profit",
            type: "bar"
          });

        // Pretaxe income
        const pretaxIncome = datas
          .filter(data => data["annualPretaxIncome"] || data["trailingPretaxIncome"])
          .map(data => data["annualPretaxIncome"] || data["trailingPretaxIncome"].slice(-1))
          .flat(1)
          .filter(data => data)
          .map(data => {
            data["date"] = new Date(data["asOfDate"]);
            return data;
          })
          .sort((a, b) => {
            return (a["date"].getTime() - b["date"].getTime());
          })
          .reduce((acc, curr) => {
            if (!acc["x"].includes(curr["asOfDate"])) {
              acc["x"].push(curr["asOfDate"]);
              acc["y"].push(curr["reportedValue"]["raw"]);
            }
            return acc;
          }, {
            x: [],
            y: [],
            name: "Pretaxe Income",
            type: "bar"
          });

        // Total expenses
        const totalExpenses = datas
          .filter(data => data["annualTotalExpenses"] || data["trailingTotalExpenses"])
          .map(data => data["annualTotalExpenses"] || data["trailingTotalExpenses"].slice(-1))
          .flat(1)
          .filter(data => data)
          .map(data => {
            data["date"] = new Date(data["asOfDate"]);
            return data;
          })
          .sort((a, b) => {
            return (a["date"].getTime() - b["date"].getTime());
          })
          .reduce((acc, curr) => {
            if (!acc["x"].includes(curr["asOfDate"])) {
              acc["x"].push(curr["asOfDate"]);
              acc["y"].push(curr["reportedValue"]["raw"]);
            }
            return acc;
          }, {
            x: [],
            y: [],
            name: "Total Expenses",
            type: "bar"
          });
          
          const totalDebt = (datas
            .filter(data => data["annualNetDebt"])
            .shift(1) || {"annualNetDebt": []})["annualNetDebt"]
            .filter(data => data)
            .map(data => {
              data["date"] = new Date(data["asOfDate"]);
              return data;
            })
            .sort((a, b) => {
              return (a["date"].getTime() - b["date"].getTime());
            })
            .reduce((acc, curr) => {
              if (!acc["x"].includes(curr["asOfDate"])) {
                acc["x"].push(curr["asOfDate"]);
                acc["y"].push(curr["reportedValue"]["raw"]);
              }
              return acc;
            }, {
              x: [],
              y: [],
              name: "Total Debt",
              type: "bar"
            });
          this.revenueProfit.data = [totalRevenue, totalExpenses, grossProfit];
          this.incomeExpenses.data = [pretaxIncome, totalDebt];

      }
    });
  }

  onRouteChanged(params: ParamMap) {
    this.page = 1;
    this.query = params["params"]["query"] || undefined;
    if (params["params"]["source"]) {
      this.source = params["params"]["source"];
    }
    if (params["params"]["period"]) {
      this.period = params["params"]["period"];
    }

    if (this.query) {
      this.loadAll();
    }
  }
}
