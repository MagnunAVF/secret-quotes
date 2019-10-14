import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  execute(email, password): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    const body = {
      email: email,
      password: password
    };

    return this.http.post(`${environment.API_BASE_URL}/login`, body, { headers: headers });
  }
}
