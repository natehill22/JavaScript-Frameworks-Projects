import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  user: User | undefined | null = null; //User state is initialized to null, but could be null, undefined, or loaded

  constructor(
    private route: ActivatedRoute, //Allows for reading routing variables from the URL string
    private service: UserService) { } //Allows the service that helps create Users

  ngOnInit(): void {
    this.route.params.subscribe(params => { //Listens whenever users navigate between profile ids in the address bar
      let id = params['id']; //Extracts the routing parameter 'id'
      if (!id) id = 1; //Provides the default to 1
      this.user = null; //Resets the current user upon navigation

      //Prevents execution if call to the dB hasn't finished yet
      this.service.users.subscribe(users => {
        if (users.length == 0) return;

        //Delays execution by half a second before loading the userById method
        setTimeout(() => {
          this.user = this.service.userById(id);
        }, 500)
      })
      
    })
  }
}
