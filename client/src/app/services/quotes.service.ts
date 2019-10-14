import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  constructor(private http: HttpClient) { }

  getQuote(path, headers = {}): Observable<any> {
    return this.http.get(`${environment.API_BASE_URL}${path}`, { headers });
  }
}
