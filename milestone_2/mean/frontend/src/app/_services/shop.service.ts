import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { lastValueFrom } from 'rxjs';

const API_URL = 'http://localhost:8080/api/shop/';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
    constructor(private http: HttpClient, private storageService: StorageService) {}

    purchaseItem = (id: string) => {
      return lastValueFrom(this.http.patch(API_URL + 'purchase', { id: id }, { withCredentials: true, responseType: 'text' }))
      .then(response => {
        return this.storageService.updateUser(response);
      })
      .catch(err => {
        console.log("Error:", err);
        return null;
      });
    };
    

    // purchaseItem(id: string): Observable<any> {
    //   return this.http.patch(API_URL + 'purchase', { id: id }, { withCredentials: true, responseType: 'text' })
    //     .pipe(
    //       map(response => {
    //         let updatedUser = this.storageService.updateUser(response); 
    //         return updatedUser;
    //       }),
    //       catchError(err => {
    //         console.log("Error:", err);
    //         return err; 
    //       })
    //     );
    // }
  }