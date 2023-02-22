// import { Injectable } from '@angular/core';

// import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

// import jtw_decode from 'jwt-decode';
// import { User } from '../model/user.model';
// import { JwtHelperService } from '@auth0/angular-jwt';
// const jwtHelper = new JwtHelperService();
// @Injectable({ providedIn: 'root' })
// export class UserService {
//   private userSubject: Subject<User | null> = new Subject<User | null>();
//   private userName!: string;
//   public currentUser: BehaviorSubject<User | null> =
//     new BehaviorSubject<User | null>(null);

//   constructor(private tokenService: TokenService) {
//     this.tokenService.hasToken() && this.decodeAndNotify();
//   }

//   setToken(token: string) {
//     this.tokenService.setToken(token);
//     this.decodeAndNotify();
//   }

//   // getUser(): Observable<User | null> {
//   //     const token = this.tokenService.getToken();
//   //     if (!token) {
//   //       return of(null);
//   //     }
//   //     const decodedToken = this.jwtHelper.decodeToken(token);
//   //     return this.http.get<User>(`${this.API}/users/${decodedToken.sub}`);
//   // }

//   private decodeAndNotify() {
//     const token = this.tokenService.getToken();

//     if (token) {
//       const user = jtw_decode(token) as User;
//       this.userName = user.name;
//       this.userSubject.next(user);
//     }
//   }

//   logout() {
//     this.tokenService.removeToken();
//     this.userSubject.next(null);
//   }

//   isLogged() {
//     return this.tokenService.hasToken();
//   }

//   getUserName() {
//     return this.userName;
//   }
// }
