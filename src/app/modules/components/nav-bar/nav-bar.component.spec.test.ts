import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { AuthService } from '../../../core/auth/auth.service';

import { NavBarComponent } from './nav-bar.component';

class AuthServiceMock {
  logout(): any {
    return of();
  }

  isLoggedIn(): any {
    return of();
  }
}

describe('NavBarComponent', () => {
  let injector: TestBed;
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientModule],
      declarations: [NavBarComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: authService, useClass: AuthServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    injector = getTestBed();
    fixture = TestBed.createComponent(NavBarComponent);

    authService = injector.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
