import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    // Send http API call to backend login route with user details
    return this.http.post(
      AUTH_API + 'login', {email, password,}, httpOptions
    );
  }

  register(firstName: string, lastName: string,email: string, password: string, organisation: string,): Observable<any> {
    return this.http.post(
      AUTH_API + 'register',
      {
        firstName,
        lastName,
        email,
        password,
        organisation,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'logout', { }, httpOptions);
  }
}