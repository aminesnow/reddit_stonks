import { TopStonks } from './../models/TopStonks';
import { CompanyInfo } from './../models/CompanyInfo';
import { StonkMention } from './../models/StonkMention';
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

  getTopStonks(days: number, page?: number, size?: number, source?: string): Observable<TopStonks[]> {
    let url = 'api/top-stonks?days=' + days;
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
    let url = 'api/top-stonks/count?days=' + days;

    if (source) {
      url += '&source=' + source;
    }

    return this.http.get<number>(url);
  }

  getCompanyInfo(ticker: string): Observable<CompanyInfo> {
    return this.http.get<CompanyInfo>(`api/stonks/${ticker}/company-info`);
  }

  getStonkLatestPosts(ticker: string, page?: number, size?: number, source?: string): Observable<StonkMention[]> {
    let url = `api/stonks/${ticker}/mentions`;
    if (page) {
      url += '&page=' + page;
    }

    if (size) {
      url += '&size=' + size;
    }

    if (source) {
      url += '&source=' + source;
    }

    return this.http.get<StonkMention[]>(url);
  }

  getStonkMentionTrend(ticker: string, days?: number, source?: string): Observable<Trend[]> {
    let url = `api/stonks/${ticker}/trend`;
    if (days) {
      url += '&days=' + days;
    }

    if (source) {
      url += '&source=' + source;
    }

    return this.http.get<Trend[]>(url);
  }
}
