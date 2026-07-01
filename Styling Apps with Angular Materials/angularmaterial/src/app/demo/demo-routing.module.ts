import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonsComponent } from './buttons/buttons.component';
import { FlexboxComponent } from './flexbox/flexbox.component';

const routes: Routes = [
  { path: 'buttons', component: ButtonsComponent }, //Maps URL to a button UI component
  { path: 'flexbox', component: FlexboxComponent }, //Maps URL to a flexbox UI component
  //If any other route is given, redirect to the buttons 'page'
  { path: '**', redirectTo: 'buttons' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], //Interprets and maps URLs to views/components
  exports: [RouterModule]
})
export class DemoRoutingModule { }
