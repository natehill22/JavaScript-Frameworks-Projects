import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss']
})
export class NewContactDialogComponent implements OnInit {

  //Registering the icons to be used in the Avatar drop-down
  avatars =[
    'svg-1', 'svg-2', 'svg-3', 'svg-4'
  ];

  //Defines the user object pulling from data within the model
  user!: User;

  constructor(
    private dialogRef: MatDialogRef<NewContactDialogComponent>, //Allows for dialog interactions to be handled
    private userService: UserService) { } //Pulls in userService

  //Defines the form control with required validation
  name = new FormControl('', [Validators.required]);

  //If blank, return an error
  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a name' : '';
  }

  //At the start, create a new User during this instance
  ngOnInit(): void {
    this.user = new User();
  }

  //
  save() {
    this.user.name = this.name.value ?? ''; //Sets the new users name to be the value entered in input (and includes safety check)

    this.userService.addUser(this.user).then(user => {
      this.dialogRef.close(user); //Adds a new user and closes new contact modal
    })
  }

  dismiss() {
    this.dialogRef.close(null); //Closes new contact modal
  }

}
