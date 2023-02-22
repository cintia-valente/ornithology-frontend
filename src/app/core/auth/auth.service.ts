import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

interface LoginResponse {
  token: string;
  name: string;
}

export const JWT_HELPER_SERVICE = new InjectionToken<JwtHelperService>(
  'JwtHelperService',
  {
    providedIn: 'root',
    factory: () => new JwtHelperService(),
  }
);

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  options = {
    headers: new HttpHeaders().set('Content-type', 'application/json'),
  };
  private readonly API = 'api/login';

  constructor(
    private http: HttpClient,
    @Inject(JWT_HELPER_SERVICE) private jwtHelper: JwtHelperService //private tokenInterceptorService: TokenInterceptor
  ) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  public login(login: string, password: string) {
    return this.http
      .post<LoginResponse>(this.API, { login: login, password: password })
      .pipe(
        map((response) => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('name', response.name);
          }
          return response;
        })
      );
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
