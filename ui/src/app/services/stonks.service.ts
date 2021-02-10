import { TopStonks } from './../models/TopStonks';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StonksService {

  constructor(private http: HttpClient) { }

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
}
