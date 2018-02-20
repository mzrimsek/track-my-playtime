import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HistoryListItem } from '../models';
import { environment } from '../../../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class HistoryService {

  constructor(private http: HttpClient) { }

  getHistoryList(): Observable<HistoryListItem[]> {
    return this.http.get<HistoryListResponse>(environment.urls.loadHistoryItems)
      .map(res => res._data);
  }
}

interface HistoryListResponse {
  _data: HistoryListItem[];
}
