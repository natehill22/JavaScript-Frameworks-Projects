import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { Direction } from '@angular/cdk/bidi';

const SMALL_WIDTH_BREAKPOINT = 720; //Sets desktop-to-mobile rendering point

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  public isScreenSmall: boolean | undefined; //Sets a default type/value for isScreenSmall

  users: Observable<User[]> | undefined; //Sets a default type/value for users
  isDarkTheme: boolean = false; //Sets a default type/value for isDarkTheme
  dir: Direction = 'ltr'; //Sets a default type/value for is dir variable

  constructor(
    private breakpointObserver: BreakpointObserver, //Allows for desktop/mobile rendering switching based on screen width
    private userService: UserService, //Allows the service that helps create Users
    private router: Router) { } //Allows access to the routing system

    @ViewChild(MatSidenav) sidenav!:MatSidenav; //Pushes Angular Material API methods to the first instance of mat-sidenav in the HTML

    //Switches between on and off states for the boolean value
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
    }

    //Switches between ltr and rtl direction states
    toggleDir() {
      this.dir = this.dir == 'ltr' ? 'rtl' : 'ltr';
    }

  ngOnInit(): void {
    this.breakpointObserver
    .observe([ `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)` ]) //Sets max width
    .subscribe((state: BreakpointState) => { //Watches viewport width continuously
      this.isScreenSmall = state.matches; //If window shrinks below breakpoint width, property is set to true
    });

    this.users = this.userService.users; //Assigns the observable sevice stream to the component property, which will stream updates smoothly
    this.userService.loadAll(); //Triggers http request to download user data

    //Listens for routing changes, checks responsive screensize flag, and hides the mat-sidenav drawer panel
    this.router.events.subscribe(() => {
      if (this.isScreenSmall) {
        this.sidenav.close();
      }
    });
  }

}
