import { AuthGuard } from './modules/core/guards/auth.guard';
import { SystemComponent } from './modules/shared/components/system/system.component';
import { StartPageComponent } from './modules/shared/components/start-page/start-page.component';
import { RegistrationComponent } from './modules/features/auth/components/registration/registration.component';
import { LoginComponent } from './modules/features/auth/components/login/login.component';
import { AuthComponent } from './modules/features/auth/layouts/auth/auth.component';
import { LayoutComponent } from './modules/layout/layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'about', pathMatch: 'full' },
      { path: 'about', component: StartPageComponent },
      { path: 'auth', redirectTo: 'auth/login', pathMatch: 'full' },
      {
        path: 'auth',
        component: AuthComponent,
        children: [
          { path: 'login', component: LoginComponent },
          { path: 'registration', component: RegistrationComponent }
        ]
      },
      { path: 'system', component: SystemComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
