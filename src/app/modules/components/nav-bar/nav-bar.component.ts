import { AuthService } from './../../../core/auth/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  show: boolean = false;
  isLoggedIn: boolean = this.authService.isLoggedIn();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
