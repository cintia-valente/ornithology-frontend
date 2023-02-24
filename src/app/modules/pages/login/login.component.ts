import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { AuthService } from './../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)],
      ],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.authService
      .login(this.loginForm.value.login, this.loginForm.value.password)
      .subscribe({
        next: () => {
          this.router.navigate(['aves']);
        },

        error: (err: HttpErrorResponse) => {
          this.toastr.error('Email ou senha inválidos.');
          this.loginForm.reset();

          return throwError(() => err);
        },
      });
  }
}
