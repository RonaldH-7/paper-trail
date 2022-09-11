import { NgModule } from '@angular/core';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['page']);

const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => 
      import('./features/auth/auth.module').then(m => m.AuthModule),
    ...canActivate(redirectLoggedInToHome)
  },
  { 
    path: 'page', 
    loadChildren: () => 
      import('./features/page/page.module').then((m) => m.PageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }