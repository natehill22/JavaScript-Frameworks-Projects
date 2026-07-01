import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { DemoRoutingModule } from './demo-routing.module';
import { ButtonsComponent } from './buttons/buttons.component';
import { FlexboxComponent } from './flexbox/flexbox.component';


@NgModule({
  imports: [
    CommonModule, //Gives access to built-in structural directives
    MaterialModule, //Allows Materials components, styles, and directives 
    FlexLayoutModule, //Provides API to design layouts using CSS flexbox and grid
    FormsModule, //Enables template-driven forms
    DemoRoutingModule //Pulls in the DemoRoutingModule defined earlier
  ],
    declarations: [ButtonsComponent, FlexboxComponent] //Uses CSS flexbox and buttons
})
export class DemoModule { }
