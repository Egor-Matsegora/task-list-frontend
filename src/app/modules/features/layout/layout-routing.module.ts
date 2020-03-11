import { SystemGuard } from './../../core/guards/system/system.guard';
import { AuthGuard } from './../../core/guards/auth/auth.guard';
import { StartPageComponent } from './../../shared/components/start-page/start-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemComponent } from '../system/components/system/system.component';

const routes: Routes = [
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  { path: 'about', component: StartPageComponent, data: { state: 'home' }, canActivate: [SystemGuard] },
  {
    path: 'auth',
    data: { state: 'auth' },
    canActivate: [SystemGuard],
    loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'system',
    component: SystemComponent,
    data: { state: 'system' },
    canActivate: [AuthGuard]
    // loadChildren: () => import('../system/system.module').then(m => m.SystemModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
