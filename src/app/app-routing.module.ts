import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { TrackerComponent } from './features/tracker/tracker.component';

import { AuthGuard } from './features/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/features/home/home.module#HomeModule'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'app',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'tracker',
        component: TrackerComponent
      },
      {
        path: 'dashboard',
        loadChildren: 'app/features/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'library',
        loadChildren: 'app/features/library/library.module#LibraryModule'
      },
      {
        path: 'completion',
        loadChildren: 'app/features/completion/completion.module#CompletionModule'
      },
      {
        path: 'profile',
        loadChildren: 'app/features/profile/profile.module#ProfileModule'
      },
      {
        path: '**',
        redirectTo: `/app/tracker`,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
