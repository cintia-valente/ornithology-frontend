import { CommonModule, Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  getTestBed,
  TestBed,
  TestComponentRenderer,
} from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';

import { AuthService } from '../../../core/auth/auth.service';

import { LoginComponent } from './login.component';

const mockToken = {
  token: 'teste',
  name: 'teste',
};

class AuthServiceMock {
  login(login: string, password: string): any {
    return of();
  }
}

class ToastrServiceMock {
  error(message?: string) {}
}

const routes: Routes = [
  {
    path: 'aves',
    component: TestComponentRenderer,
  },
];

describe('LoginComponent', () => {
  let injector: TestBed;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let location: Location;
  let authService: AuthService;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(routes),
      ],
      declarations: [LoginComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: authService, useClass: AuthServiceMock },
        { provide: ToastrService, useClass: ToastrServiceMock },
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    injector = getTestBed();
    fixture = TestBed.createComponent(LoginComponent);
    location = injector.inject(Location);

    authService = injector.inject(AuthService);
    toastrService = injector.inject(ToastrService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Dado: que o componente foi carregado
      Quando: preencher o formulário
      E: clicar no botão entrar
      Então: deve chamar o serviço authService.login e redirecionar para a rota /aves`, async () => {
    //Arrange
    const spyLogin = jest
      .spyOn(authService, 'login')
      .mockReturnValue(of(mockToken));

    //Act
    fixture.detectChanges();
    await fixture.whenStable();

    const inputEmail = fixture.nativeElement.querySelector(
      '.login .form-group:nth-child(1) input'
    );

    inputEmail.value = 'teste@email.com';

    inputEmail.dispatchEvent(new Event('input'));

    const inputPassword = fixture.nativeElement.querySelector(
      '.login .form-group:nth-child(2) input'
    );

    inputPassword.value = '1111';

    inputPassword.dispatchEvent(new Event('input'));

    const button = fixture.nativeElement.querySelector(
      '.login .row.justify-content-center form .button-register-edit > button'
    );

    button.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const pathBirdList = location.path();

    //Assert
    expect(spyLogin).toHaveBeenCalled();
    expect(pathBirdList).toEqual('/aves');
  });

  it(`Dado: que o componente foi carregado
      Quando: atribuir um erro no serviço 
      E: clicar no botão entrar
      Então: deve chamar o serviço authService.login e toastrService.error`, async () => {
    //Arrange
    const errorMessage = {
      error: 'error',
      status: 400,
      message: 'Server Error',
    };

    const spyLoginError = jest
      .spyOn(authService, 'login')
      .mockReturnValue(throwError(() => errorMessage));

    const spyError = jest
      .spyOn(toastrService, 'error')
      .mockReturnValue({} as any);

    //Act
    fixture.detectChanges();
    await fixture.whenStable();

    const inputEmail = fixture.nativeElement.querySelector(
      '.login .form-group:nth-child(1) input'
    );

    inputEmail.value = 'teste@email.com';

    inputEmail.dispatchEvent(new Event('input'));

    const inputPassword = fixture.nativeElement.querySelector(
      '.login .form-group:nth-child(2) input'
    );

    inputPassword.value = '1111';

    inputPassword.dispatchEvent(new Event('input'));

    const button = fixture.nativeElement.querySelector(
      '.login .row.justify-content-center form .button-register-edit > button'
    );

    button.click();

    //Assert
    expect(spyLoginError).toHaveBeenCalled();
    expect(spyError).toHaveBeenCalled();
  });
});
