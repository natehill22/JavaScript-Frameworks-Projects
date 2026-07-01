import { NgModule } from '@angular/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [],
  exports: [
    MatAutocompleteModule, //Allows autocomplete dropdown menu
    MatCheckboxModule, //Allows NG Material checkbox
    MatDatepickerModule, //Allows NG Material date picker, toggle buttons, calender popup, etc.
    MatNativeDateModule, //Allows NG Material to interact with Date objects
    MatFormFieldModule, //Allows NG Material to created stlyed input fields
    MatInputModule, //Allows inputs and textareas to gel with their wrapper
    MatRadioModule, //Allows NG Material radio button components
    MatSelectModule, //Allows NG Material dropdown selections
    MatSliderModule, //Allows interactive sliders
    MatSlideToggleModule, //Allows switches/toggles
    MatMenuModule, //Allows dropdown/pop-up menus
    MatSidenavModule, //Allows NG Material sidebars or drawers
    MatToolbarModule, //Allows NG Material toolbars
    MatCardModule, //Allows NG Material cards
    MatDividerModule, //Allows NG Material collapsible sidebars
    MatExpansionModule, //Allows NG Material expansion panels
    MatGridListModule, //Allows NG Material grids
    MatListModule, //Allows NG Material lists
    MatStepperModule, //Allows multi-step workflows
    MatTabsModule, //Allows NG Material tab components
    MatTreeModule, //Allows heirarchical tree structures
    MatButtonModule, //Allows NG Material buttons
    MatButtonToggleModule, //Allows NG Material button toggles
    MatBadgeModule, //Allows NG Material notification and status indicators
    MatChipsModule, //Allows NG Material chip UI elements
    MatIconModule, //Allows NG Material icons
    MatProgressSpinnerModule, //Allows NG Material progress spinners
    MatProgressBarModule, //Allows NG Material progress bars
    MatRippleModule, //Allows for ripple effect
    MatBottomSheetModule, //Allows interactive panels from screen bottom
    MatDialogModule, //Allows modal dialogs
    MatSnackBarModule, //Allows NG Material snackbars
    MatTooltipModule, //Allows NG Material tooltips
    MatPaginatorModule, //Allows NG Material paginators
    MatSortModule, //Allows NG Material sort
    MatTableModule //Allows NG Material tables
  ]
})
export class MaterialModule { }
