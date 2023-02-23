import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { BirdComponent } from './modules/pages/bird/bird.component';
import { AnnotationFormComponent } from './modules/pages/annotation-form/annotation-form.component';
import { AnnotationListComponent } from './modules/pages/annotation-list/annotation-list.component';
import { LoginComponent } from './modules/pages/login/login.component';
import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'aves',
    component: BirdComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'anotacoes',
    component: AnnotationListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cadastrar',
    component: AnnotationFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cadastrar/:birdName',
    component: AnnotationFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editar-anotacoes/:id',
    component: AnnotationFormComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
