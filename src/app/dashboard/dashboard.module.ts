import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ServicesComponent } from './services/services.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProjectsComponent } from './projects/projects.component';
import { UsersComponent } from './users/users.component';
import { RouterModule } from '@angular/router';
import { StatisticsComponent } from './statistics/statistics.component';
import { MaterialModule } from '../material/material.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SingleUserComponent } from './single-user/single-user.component';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [
    SideMenuComponent, 
    ToolbarComponent, 
    ServicesComponent, 
    CategoriesComponent, 
    ProjectsComponent, 
    UsersComponent, 
    StatisticsComponent, LoginComponent, SingleUserComponent, RegisterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    SideMenuComponent, 
    ToolbarComponent, 
    ServicesComponent, 
    CategoriesComponent, 
    ProjectsComponent, 
    UsersComponent, 
    StatisticsComponent
  ]
})
export class DashboardModule { }
