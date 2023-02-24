import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from './core/auth/auth.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TokenInterceptor } from './core/auth/token-inteceptor';

import { AppComponent } from './app.component';
import { NavBarComponent } from './modules/components/nav-bar/nav-bar.component';
import { AnnotationFormComponent } from './modules/pages/annotation-form/annotation-form.component';
import { AnnotationListComponent } from './modules/pages/annotation-list/annotation-list.component';
import { BirdComponent } from './modules/pages/bird/bird.component';
import { LoginComponent } from './modules/pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AnnotationFormComponent,
    AnnotationListComponent,
    BirdComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
