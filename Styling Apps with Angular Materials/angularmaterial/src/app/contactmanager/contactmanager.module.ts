import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContactmanagerAppComponent } from './contactmanager-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { NotesComponent } from './components/notes/notes.component';
import { NewContactDialogComponent } from './components/new-contact-dialog/new-contact-dialog.component';


const routes: Routes = [
  //Sets default route to contactmanager
  { path: '', component: ContactmanagerAppComponent,
    children: [
      { path: ':id', component: MainContentComponent }, //Sets a contactmanager/id child route
      { path: '', component: MainContentComponent }
    ]
   },
  { path: '**', redirectTo: '' } //Sets the wildcard route to match the defaults
];

@NgModule({
  declarations: [
    ContactmanagerAppComponent, //Allows SVG icons
    ToolbarComponent, //Allows a toolbar
    MainContentComponent, //Main page user templates
    SidenavComponent, //Allows sidenav content
    NotesComponent, //Allows notes
    NewContactDialogComponent //Allows new contacts to be created
  ],
  imports: [
    CommonModule, //Gives access to built-in structural directives
    HttpClientModule, //Provides tools to make HTTP requests to backend APIs
    MaterialModule, //Allows form materials components, styles, and directives 
    FlexLayoutModule, //Provides API to design layouts using CSS flexbox and grid
    FormsModule, //Enables template-driven forms
    ReactiveFormsModule, //Provides a model-driven approach to handling forms
    RouterModule.forChild(routes) //Interprets and maps URLs to views/components
  ], 
  providers: [
    UserService //Allows the service that helps create Users
  ]
})
export class ContactmanagerModule { }
