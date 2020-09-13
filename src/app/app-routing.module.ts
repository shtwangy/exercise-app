import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersModule),
  },
  {
    path: 'exercise',
    loadChildren: () => import('./exercise/exercise.module').then( m => m.ExerciseModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
