import { WatchlistItem } from './../../models/StonkMention';
import { Component, OnInit } from '@angular/core';
import { StonksService } from 'src/app/services/stonks.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

  watchlist: WatchlistItem[] = [];

  constructor(
    private toastService: ToastService,
    private stonksService: StonksService) { }

  ngOnInit(): void {
    this.loadWatchlist();
  }

  removeFromWatchlist(ticker: string)  {
    this.stonksService.removeFromWatchlist(ticker).subscribe(comp => {
      this.loadWatchlist();
      this.toastService.show(`${ticker} is removed from the watch list`, { classname: 'bg-danger text-light' });
    });
  }

  loadWatchlist() {
    this.stonksService.getWatchlist().subscribe(list => {      
      this.watchlist = list;
    });
  }
}
