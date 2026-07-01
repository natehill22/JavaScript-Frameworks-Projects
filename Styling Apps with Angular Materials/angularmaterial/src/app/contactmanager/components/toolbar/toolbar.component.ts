import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  //Custom events that passes data to a parent. Emits when called.
  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<void>();
  @Output() toggleDir = new EventEmitter<void>(); //

  constructor(
    private dialog: MatDialog, //Allows modal pop-ups
    private snackBar: MatSnackBar, //Allows toast notifications  
    private router: Router) { } //Allows for page navigation

  ngOnInit(): void {
  }

  openAddContactDialog(): void {
    //Opens a New Contact modal and sets width
    let dialogRef = this.dialog.open(NewContactDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result); //Give a console message whenever New Contact modal is closed

      if (result) {
        this.openSnackBar("Contact added", "Navigate") //Shows these two options in the SnackBar pop-up
        .onAction().subscribe(() => { //When action/nagivate is selected, take user to the new users' route
          this.router.navigate(['/contactmanager', result.id]);
        });
      }
    });
  }

  //Shows the snackbar notification with the parameters for 5 seconds
  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
