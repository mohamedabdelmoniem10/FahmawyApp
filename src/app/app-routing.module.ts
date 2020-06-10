import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ServicesComponent } from './dashboard/services/services.component';
import { StatisticsComponent } from './dashboard/statistics/statistics.component';
import { UsersComponent } from './dashboard/users/users.component';
import { LoginComponent } from './dashboard/login/login.component';
import { GuardGuard } from './guard.guard';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [{
      path: '',
      component: StatisticsComponent,
      canActivate:[GuardGuard]
    },
    {
      path: 'users',
      component: UsersComponent,
      canActivate:[GuardGuard]
    },
    {
      path: 'dashboard',
      component: StatisticsComponent,
      canActivate:[GuardGuard]
    }
  ]
},
{
  path: 'login',
  component: LoginComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
