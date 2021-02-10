import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StonksService } from 'src/app/services/stonks.service';

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css']
})
export class TickerComponent implements OnInit {

  query: string;
  stonkTitle: string;

  constructor(
    private Activatedroute: ActivatedRoute,
    private stonksService: StonksService) { }

  ngOnInit(): void {
    this.Activatedroute.queryParamMap.subscribe(params => {
      this.query = params.get('symbol') || undefined;
      console.log(this.query);
    });
  }

  loadStonk(){
    console.log(this.query);
  }
}
