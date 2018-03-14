import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class PlatformsService {

  constructor(private http: HttpClient) { }

  getPlatformsOptions(): Observable<string[]> {
    return this.http.get<PlatformsResponse>(environment.urls.loadPlatforms)
      .map(res => res._data);
  }
}

interface PlatformsResponse {
  _data: string[];
}
