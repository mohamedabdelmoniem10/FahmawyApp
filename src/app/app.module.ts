import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { displayDialog, editDialog } from './dashboard/projects/projects.component';
import { serviceeditDialog, servicedisplayDialog } from './dashboard/services/services.component';
import { CatEditDialog, CatPEditDialog } from './dashboard/categories/categories.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ConfirmDeleteComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    ConfirmDeleteComponent,
    displayDialog, 
    editDialog, 
    serviceeditDialog,
    servicedisplayDialog, 
    CatEditDialog, 
    CatPEditDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DashboardModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
