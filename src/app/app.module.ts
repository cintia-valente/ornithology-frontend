import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnnotationFormComponent } from './modules/pages/annotation-form/annotation-form.component';
import { BirdComponent } from './modules/pages/bird/bird.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AnnotationListComponent } from './modules/pages/annotation-list/annotation-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { UserListComponent } from './modules/pages/user-list/user-list.component';
//import { UserFormComponent } from './modules/pages/user-form/user-form.component';
import { NavBarComponent } from './modules/components/nav-bar/nav-bar.component';
import { LoginComponent } from './modules/pages/login/login.component';
import { AuthService } from './core/auth/auth.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TokenInterceptor } from './core/auth/token-inteceptor';

@NgModule({
  declarations: [
    AppComponent,
    AnnotationFormComponent,
    BirdComponent,
    AnnotationListComponent,
    // UserListComponent,
    // UserFormComponent,
    NavBarComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
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
