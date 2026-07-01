import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [ 
  //When contactmanager path is navigated to, asynchronously download the ContactmanagerModule
  { path: 'contactmanager', loadChildren: () => import('./contactmanager/contactmanager.module').then(m => m.ContactmanagerModule) },
  //When demo path is navigated to, asynchronously download the DemoModule
  { path: 'demo', loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule) },
  //If any other route is given, redirect to the contact manager 'page'
  { path: '**', redirectTo: 'contactmanager' }
];

@NgModule({
  declarations: [ //Defines which UI elements belong to this module
    AppComponent //Root component--acts as the master wrapper
  ],
  imports: [ //Brings in exported elements from other modules to use here
    BrowserModule, //Provides services to run an app in the browser
    BrowserAnimationsModule, //Enables apps animation system
    HttpClientModule, //Provides tools to make HTTP requests to backend APIs
    RouterModule.forRoot(routes) //Interprets and maps URLs to views/components
  ],
  providers: [], //Registers services/logic for dependency injection
  bootstrap: [AppComponent] //Defines root component to be loaded first when launching the app
})
export class AppModule { }
