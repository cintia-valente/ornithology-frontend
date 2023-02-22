// import { Injectable } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';

// const KEY = 'authToken';
// const jwtHelper = new JwtHelperService();

// @Injectable({ providedIn: 'root' })
// export class TokenService {
//   hasToken() {
//     return !!this.getToken();
//   }

//   setToken(token: any) {
//     window.localStorage.setItem(KEY, token);
//   }

//   getToken() {
//     return window.localStorage.getItem(KEY);
//   }

//   removeToken() {
//     window.localStorage.removeItem(KEY);
//   }

//   getUserFromToken(token: string) {
//     const decodedToken = jwtHelper.decodeToken(token);
//     return {
//       id: decodedToken.id,
//       username: decodedToken.username,
//       email: decodedToken.email,
//     };
//   }
// }
