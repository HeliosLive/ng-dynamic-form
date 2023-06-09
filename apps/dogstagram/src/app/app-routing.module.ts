import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    path: 'home'
  },
  {
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
    path: 'profile'
  },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: '**', pathMatch: 'full', redirectTo: '/home' }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })
  ]
})
export class AppRoutingModule {}
