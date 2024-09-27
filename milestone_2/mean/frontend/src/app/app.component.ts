import { Component } from '@angular/core';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private role: string = '';
  isLoggedIn = false;
  showAdminBoard = false;
  showStaffBoard = false;
  showUserBoard = false;
  user: string = '';

  constructor(private storageService: StorageService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      if (user) {
        this.user = user;
        this.role = user.role;
        this.showAdminBoard = this.role.includes('role_admin');
        this.showStaffBoard = this.role.includes('role_staff');
        this.showUserBoard = this.role.includes('role_user');
      }      
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();

        this.role = "";
        this.isLoggedIn = false;
        this.showAdminBoard = false;
        this.showStaffBoard = false;
        this.showUserBoard = false;
        this.user = "";

        this.router.navigate(['/home']);
      },
      error: err => {
        console.log(err);
      }
    });
  }
}