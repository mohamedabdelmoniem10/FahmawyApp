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



@NgModule({
  declarations: [
    SideMenuComponent, 
    ToolbarComponent, 
    ServicesComponent, 
    CategoriesComponent, 
    ProjectsComponent, 
    UsersComponent, 
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
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
