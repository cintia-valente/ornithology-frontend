import { Component } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
//import { DataSharingService } from './core/auth/data-sharing.service';

//import { DataSharingService } from './services/data-sharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // title = 'ornitholgy';
  // isChecked = false;
  // isLogged: boolean = this.authService.isLogged();
  // constructor(
  //   private authService: AuthService,
  //   private dataSharingService: DataSharingService
  // ) {
  //   console.log('logado:', this.isLogged);
  //   this.dataSharingService.isUserLoggedIn.subscribe((value: any) => {
  //     this.isLogged = value;
  //     console.log('logado:', this.isLogged);
  //   });
  // }
  // OnLogout() {
  //   this.authService.logout();
  //   this.dataSharingService.isUserLoggedIn.next(false);
  // }
  // OnLogin() {
  //   this.dataSharingService.isUserLoggedIn.next(true);
  // }
}
