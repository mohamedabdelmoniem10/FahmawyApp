import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ServicesComponent } from './dashboard/services/services.component';
import { StatisticsComponent } from './dashboard/statistics/statistics.component';
import { UsersComponent } from './dashboard/users/users.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [{
      path: '',
      component: StatisticsComponent,
    },
    {
      path: 'users',
      component: UsersComponent,
    },
    {
      path: 'dashboard',
      component: StatisticsComponent,
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
