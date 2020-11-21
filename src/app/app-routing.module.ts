import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersModule),
  },
  {
    path: 'weight',
    loadChildren: () => import('./weight/weight.module').then( m => m.WeightModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
