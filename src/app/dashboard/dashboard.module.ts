import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ServicesComponent, servicedisplayDialog, serviceeditDialog } from './services/services.component';
import { CategoriesComponent, CatEditDialog, CatPEditDialog } from './categories/categories.component';
import { ProjectsComponent, displayDialog, editDialog } from './projects/projects.component';
import { UsersComponent } from './users/users.component';
import { RouterModule } from '@angular/router';
import { StatisticsComponent } from './statistics/statistics.component';
import { MaterialModule } from '../material/material.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SingleUserComponent } from './single-user/single-user.component';
import { RegisterComponent } from './register/register.component';
import { TeamsComponent } from './teams/teams.component';
import { SingleTeamComponent } from './single-team/single-team.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    SideMenuComponent, 
    ToolbarComponent, 
    ServicesComponent, 
    CategoriesComponent, 
    ProjectsComponent, 
    UsersComponent, 
    StatisticsComponent, 
    LoginComponent, 
    SingleUserComponent, 
    RegisterComponent, 
    TeamsComponent, 
    SingleTeamComponent,
    ProfileComponent,
    servicedisplayDialog,
    serviceeditDialog,
    CatEditDialog,
    CatPEditDialog,
    displayDialog,
    editDialog
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
    StatisticsComponent,
    ProfileComponent,
    
  ],
})
export class DashboardModule { }
