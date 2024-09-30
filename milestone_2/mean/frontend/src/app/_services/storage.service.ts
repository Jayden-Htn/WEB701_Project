import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public updateUser(data: any): any {
    // Get current user data stored in session storage
    let user = this.getUser();
    if (user) {
      data = JSON.parse(data);
      // Update values from purchase
      user.tokens = data.tokens;
      user.purchases = data.purchases;
      window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
      return user;
    } else {
      console.log("Error: User not found in localStorage");
      return null;
    }
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    console.log("No user");
    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
}