import { RegistrationComponent } from './components/registration/registration.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  // { path: 'auth', redirectTo: 'auth/login', pathMatch: 'full' },
  // { path: 'auth', component: AuthComponent }
  // { path: 'auth/login', component: LoginComponent },
  // { path: 'auth/registration', component: RegistrationComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
