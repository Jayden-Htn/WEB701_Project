import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';

const API_URL = 'http://localhost:8080/api/page/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private storageService: StorageService) {}

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { withCredentials: true, responseType: 'text' });
  }
  
  getStaffBoard(): Observable<any> {
    return this.http.get(API_URL + 'staff', { withCredentials: true, responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { withCredentials: true, responseType: 'text' });
  }
}