import { AutocompleteCompany } from '../models/AutocompleteCompany';
import { TopStonks } from './../models/TopStonks';
import { CompanyInfo } from './../models/CompanyInfo';
import { StonkMention, WatchlistItem } from './../models/StonkMention';
import { Trend } from './../models/Trend';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StonksService {

  constructor(private http: HttpClient) { }

  getMentionSources(): Observable<string[]> {
    return this.http.get<string[]>('api/stonks/sources');
  }

  autocompleteCompanies(query: string): Observable<AutocompleteCompany[]> {
    return this.http.get<AutocompleteCompany[]>('api/stonks/autocomplete?query=' + query);
  }

  getTopStonks(days: number, page?: number, size?: number, source?: string): Observable<TopStonks[]> {
    let url = 'api/stonks/top-stonks?days=' + days;
    if (page) {
      url += '&page=' + page;
    }

    if (size) {
      url += '&size=' + size;
    }

    if (source) {
      url += '&source=' + source;
    }

    return this.http.get<TopStonks[]>(url);
  }

  countTopStonks(days: number, source?: string): Observable<number> {
    let url = 'api/stonks/top-stonks/count?days=' + days;

    if (source) {
      url += '&source=' + source;
    }

    return this.http.get<number>(url);
  }

  getCompanyInfo(ticker: string): Observable<CompanyInfo> {
    return this.http.get<CompanyInfo>(`api/stonks/${ticker}/company-info`);
  }

  getStonkLatestPosts(ticker: string, page: number, size?: number, source?: string): Observable<StonkMention[]> {
    let url = `api/stonks/${ticker}/mentions?page=${page}`;

    if (size) {
      url += '&size=' + size;
    }

    if (source) {
      url += '&source=' + source;
    }

    return this.http.get<StonkMention[]>(url);
  }

  countStonkLatestPosts(ticker: string, source?: string): Observable<number> {
    let url = `api/stonks/${ticker}/mentions/count`;

    if (source) {
      url += '?source=' + source;
    }

    return this.http.get<number>(url);
  }

  getStonkMentionTrend(ticker: string, days: number, source?: string): Observable<Trend[]> {
    let url = `api/stonks/${ticker}/trend?days=${days}`;

    if (source) {
      url += '&source=' + source;
    }

    return this.http.get<Trend[]>(url);
  }

  getPriceAction(ticker: string, startTs: number, endTs: number) {
    return this.http.get(`v8/finance/chart/${ticker}?symbol=${ticker}&period1=${startTs}&period2=${endTs}&useYfid=true&interval=90m&includePrePost=true&events=div%7Csplit%7Cearn&lang=en-US&region=US&crumb=5%2Faa1sowFUZ&corsDomain=finance.yahoo.com`);
  }

  getFinancials(ticker: string) {
    return this.http.get(`ws/fundamentals-timeseries/v1/finance/timeseries/${ticker}?lang=en-US&region=US&symbol=${ticker}&padTimeSeries=true&type=trailingPretaxIncome,annualGrossProfit,trailingTotalExpenses,annualTotalRevenue,trailingGrossProfit,trailingTotalRevenue,annualPretaxIncome,annualTotalExpenses,annualNetDebt&merge=false&period1=493590046&period2=1613148405&corsDomain=finance.yahoo.com`);
  }

  addToWatchlist(ticker: string): Observable<CompanyInfo> {
    return this.http.post<CompanyInfo>(`api/stonks/${ticker}/add-to-watchlist`, {});
  }

  removeFromWatchlist(ticker: string): Observable<CompanyInfo>  {
    return this.http.post<CompanyInfo>(`api/stonks/${ticker}/remove-from-watchlist`, {});
  }

  getWatchlist(): Observable<WatchlistItem[]> {
    return this.http.get<WatchlistItem[]>('api/stonks/watchlist');
  }
}


