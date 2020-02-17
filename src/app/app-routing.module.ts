import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SystemGuard } from './modules/core/guards/system/system.guard';
import { AuthGuard } from './modules/core/guards/auth/auth.guard';
import { StartPageComponent } from './modules/shared/components/start-page/start-page.component';
import { RegistrationComponent } from './modules/features/auth/components/registration/registration.component';
import { LoginComponent } from './modules/features/auth/components/login/login.component';
import { AuthComponent } from './modules/features/auth/layouts/auth/auth.component';
import { LayoutComponent } from './modules/features/layout/components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () => import('./modules/features/layout/layout.module').then(m => m.LayoutModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
