import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TopStonks } from '../../../app/models/TopStonks';
import { StonksService } from '../../../app/services/stonks.service';

@Component({
  selector: 'app-all-stonks',
  templateUrl: './all-stonks.component.html',
  styleUrls: ['./all-stonks.component.css']
})
export class AllStonksComponent implements OnInit {

  pageSize: number = 10;
  page: number = 0;
  period: number;

  stonks: TopStonks[] = [];
  stonksSize: number;

  sources: string[] = ["all"];
  source: string = "all";

  loading: boolean;

  constructor(
    private stonksService: StonksService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.period = 1;
    this.stonksService.getMentionSources().subscribe(s => this.sources = this.sources.concat(s));
    this.loadStonks(1);
    this.route.queryParamMap.subscribe(params => {
      this.onRouteChanged(params);
    });
  }

  loadPage() {
    this.router.navigate(['/stonks'], { queryParams: { source: this.source, period: this.period } });
  }

  loadStonks(page: number) {
    this.page = page;
    this.loading = true;
    this.stonksService.countTopStonks(this.period, this.source).subscribe(c => {
      this.stonksSize = c['count'];
      this.stonksService.getTopStonks(this.period, page - 1, this.pageSize, this.source).subscribe(s => {
        this.stonks = s;
        this.loading = false;
      });
    });
  }

  onRouteChanged(params: ParamMap) {
    this.page = 1;
    if (params["params"]["source"]) {
      this.source = params["params"]["source"];
    }
    if (params["params"]["period"]) {
      this.period = params["params"]["period"];
    }
    this.loadStonks(this.page);
  }

}
