import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})

//State variables were converted into Writable Signals so that page updates triggered immediately 
export class App {
  userScore = signal<number>(0);
  compScore = signal<number>(0);
  userSelected = signal<string> (''); //Which weapon user selected
  compSelected = signal<string> (''); //Which weapon computer selected
  action = signal<string> (''); //Whether user weapon beats or loses to computer
  status = signal<string> (''); //Whether it's a win, lose, or draw
  compWeapons = [
    'rock',
    'paper',
    'scissors'
  ];

  //Uses a computed signal to return the endgame phrase only if status has a value
  resultMessage = computed(() => {
    if (!this.status()) return '';
    return `${this.userSelected()} ${this.action()} ${this.compSelected()}${this.status()}`;
  });

  //Executed whenever a 'weapon' is clicked
  userPick(userWeapon: string): void {
    //Prevents clicking if a game is already being played
    if (this.status()) return;
    this.userSelected.set(userWeapon); //Set method is used to update signal values
    this.status.set('processing'); //Allows "Wait..." to show to the user immediately
    setTimeout( () => {
      const randomNum = Math.floor(Math.random() * 3);
      this.compSelected.set(this.compWeapons[randomNum]);
      this.checkResult();
    }, 1000); //Randomly assigns a compSelected value and runs both user/comp selections through the checkResult method after 1 second delay
  }

  //Clears status and selections after 1.5 seconds
  clearField() {
    setTimeout(() => {
      this.status.set(''); //Set method is used to update signal values
      this.userSelected.set('');
      this.compSelected.set('');
    }, 1500);
  }

  //When user wins, increment user score by 1, update action and status text, and clear all fields after 1.5 seconds
  win() {
    this.userScore.update(score => score +1); //Update method is used when the new state depends on the previous state
    this.action.set('beats');
    this.status.set('. You win!');
    this.clearField();
  }

  //When comp wins, increment comp score by 1, update action and status text, and clear all fields after 1.5 seconds
  lose() {
    this.compScore.update(score => score +1); //Update method is used when the new state depends on the previous state
    this.action.set('loses to');
    this.status.set('. You lose!');
    this.clearField();
  }

  //When user and comp get the same answer, update action and status text, and clear all fields after 1.5 seconds
  draw() {
    this.action.set('and');
    this.status.set('. You draw!');
    this.clearField();
  }

  //Check who wins and who loses
  checkResult() {
    //Read signal values to evaluate game logic
    const userChoice = this.userSelected();
    const compChoice = this.compSelected();
    //Uses selection phrases themselves smooshed together to determine win condition. Otherwise, it's a draw
    switch (userChoice + compChoice) {
      case 'rockscissors':
      case 'paperrock':
      case 'scissorspaper':
        this.win();
        break;
      case 'rockpaper':
      case 'scissorsrock':
      case 'paperscissors':
        this.lose();
        break;
      default:
        this.draw();
        break;
    }
  }
}
