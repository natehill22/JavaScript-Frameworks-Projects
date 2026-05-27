//Returns a random integer between given min and max
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Defines keyboard letter-button component
Vue.component("letter-button", {
props: ["letter", "gameOver", "twoPlayers"],
//Dynamically binds button's ID to the letter prop value, disables the button, triggers 'clicked' method upon click, and displays character inside button
template: "<button class='keyboard-row-letter' :id='letter' :disabled='disabled' @click='clicked()'>{{ letter }}</button>",
//Defines a non-disabled state (this is reactive and can be updated later)
data: function() {
    return {
        disabled: false
    };
},
//Disables keyboard button and sends 'check' event to run check() in main Vue instance upon click
methods: {
    clicked: function() {
        this.disabled = true;
        this.$emit("check"); //Custom event used to run the 'check' method
    }
},
watch: {
    //Disables all buttons on game over; re-enables all buttons on restart
    gameOver: function(newValue) {
        this.disabled = newValue;
    },
    //Re-enables all button when a new two-player game is started
    twoPlayers: function(newValue) {
        this.disabled = false;
    }
}
})

//Main Vue instance
var app = new Vue({
el: "#app", //Ties to style
data: {
    //Virtual keyboard letters (in rows matching keyboard layout)
    letters: [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Z", "X", "C", "V", "B", "N", "M"]
    ],
    //Word pool (words to draw from)
    words: [
        "BUTTERCUP",
        "TANSY",
        "PIGEON",
        "REPTILE",
        "HAWK",
        "CAPYBARA",
        "DELICATE",
        "OFFICIAL",
        "ALIMONY",
        "GRANOLA",
        "IMPERATIVE",
        "DELICIOUS",
        "ANTICIPATION",
        "APPLE",
        "BANANA",
        "BILIOUS",
        "INTESTINE",
        "AMPLIFY",
        "GALLANTRY",
        "VOLUMINOUS",
        "STARGAZER",
        "FILTHY",
        "MANGROVE",
        "SUFFICIENT",
        "JOCULAR",
        "PLUCKY"
    ],
    //Sets currentWord to blank (will be set to a random word from above list)
    currentWord: "",
    //Sets wordDivs to be an empty array (will be used to create blanks for each letter in the selected word)
    wordDivs: [],
    //Counts the number of wrong guesses (initially set to 0)
    guesses: 0,
    gameOver: false,
    lost: false,
    twoPlayers: false,
    //Sets the canvas to blank (will be set in 'mounted' method)
    canvas: "",
    //Sets ctx to blank (will be set to the canvas 2d context in 'mounted' method)
    ctx: ""
},

methods: {

    //Draws the gallows
    drawGallows: function(ctx) {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //Clears entire canvas
        ctx.fillStyle = "#4A2E1B"; //Sets color
        ctx.strokeStyle = "#4A2E1B"; //Retrieves color
        ctx.beginPath(); //Resets current path, so a new shape can be drawn
        //Left side
        ctx.moveTo(this.canvas.width / 10, this.canvas.height / 10);
        ctx.lineTo(this.canvas.width / 10, this.canvas.height * 0.95);
        //Bottom side
        ctx.lineTo(this.canvas.width * 0.8, this.canvas.height * 0.95);
        //Top side
        ctx.moveTo(this.canvas.width / 10, this.canvas.height / 10);
        ctx.lineTo(this.canvas.width * 0.4, this.canvas.height / 10);
        //Hanging notch
        ctx.lineTo(this.canvas.width * 0.4, this.canvas.height / 5);
        ctx.stroke(); //Draws visible outline using set line color and thickness
        ctx.closePath(); //Brings drawing position back to starting point
    },

    //Fills this.wordDivs with empty strings to create the brown letter-blanks
    makeBlanks: function() {
        for (var i = 0; i < this.currentWord.length; i++) {
            this.wordDivs.push(""); //Adds each element to the empty array (to the end)
        }
    },

    //Draws appropriate part of the hanging man and/or 'game over'
    updateCanvas: function(ctx) {
        //Draws the head
        if (this.guesses === 0) {
            ctx.beginPath();
            //Creates a circle that represents the head
            ctx.arc(this.canvas.width * 0.4, (this.canvas.height / 5) + 20, 20, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();
        }
        //Draws the torso
        else if (this.guesses === 1) {
            ctx.beginPath();
            ctx.moveTo(this.canvas.width * 0.4, (this.canvas.height / 5) + 40);
            ctx.lineTo(this.canvas.width * 0.4, this.canvas.height / 2); 
            ctx.stroke();
            ctx.closePath();
        }
        //Draws the right leg
        else if (this.guesses === 2) {
            ctx.beginPath();
            ctx.moveTo(this.canvas.width * 0.4, this.canvas.height / 2);
            ctx.lineTo((this.canvas.width * 0.4) + 30, this.canvas.height * 0.7); 
            ctx.stroke();
            ctx.closePath();
        }
        //Draws the left leg
        else if (this.guesses === 3) {
            ctx.beginPath();
            ctx.moveTo(this.canvas.width * 0.4, this.canvas.height / 2);
            ctx.lineTo((this.canvas.width * 0.4) - 30, this.canvas.height * 0.7); 
            ctx.stroke();
            ctx.closePath();
        }
        //Draws the right arm
        else if (this.guesses === 4) {
            ctx.beginPath();
            ctx.moveTo(this.canvas.width * 0.4, (this.canvas.height / 5) + 55);
            ctx.lineTo((this.canvas.width * 0.4) + 35, (this.canvas.height / 2) + 10); 
            ctx.stroke();
            ctx.closePath();
        }
        //Draws the left arm and handles game over
        else if (this.guesses === 5) {
            ctx.beginPath();
            ctx.moveTo(this.canvas.width * 0.4, (this.canvas.height / 5) + 55);
            ctx.lineTo((this.canvas.width * 0.4) - 35, (this.canvas.height / 2) + 10); 
            ctx.stroke();
            ctx.closePath();

            //Game over
            ctx.font = "24px Inter, sans-serif";
            ctx.fillText("Game Over", this.canvas.width * 0.4 - 30, this.canvas.height * 0.9);
            this.gameOver = true;
            this.lose = true;

            //Fills in the word with the correct answer (when lost)
            for (var i = 0; i < this.currentWord.length; i++) {
                Vue.set(this.wordDivs, i, this.currentWord[i]);
            }
        }
        this.guesses++ //Increments guesses by 1 each time around
    },

    // check the chosen letter when a letter component emits 'check'
    check: function(letter) {
        if (!this.gameOver) {
            var guessCorrect = false;
            // check if the letter is in the word, if so, fill it in
            for (var i = 0; i < this. currentWord.length; i++) {
                if (letter == this.currentWord[i]) {
                    Vue.set(this.wordDivs, i, letter);
                    guessCorrect = true;
                }
            }
            // if there are no more blanks in the word, you win
            if (!this.wordDivs.some(function(value) {return value == ""})) {
                this.gameOver = true;
                this.ctx.font = "24px Inter, sans-serif";
                this.ctx.fillText("You Win!", this.canvas.width * 0.4 - 30, this.canvas.height * 0.9);
            }
            // if they guess wrong, draw the man
            if (!guessCorrect) {
                this.updateCanvas(this.ctx);
            }
        }
    },

    //re-initializes the game
    restart: function () {
        this.gameOver = false;
        this.lose = false;
        this.guesses = 0;
        this.wordDivs.splice(0);
        this.drawGallows(this.ctx);
        this.makeBlanks();
    },

    // resets the game to one-player mode and chooses a new word
    onePlayer: function() {
        if (this.twoPlayers) {
            this.twoPlayers = false;
            this.currentWord = this.words[randomInteger(0, this.words.length - 1)];
            this.restart();
        }
    },

    // starts two-player mode and prompts the user to enter a word
    twoPlayer: function() {
        if (!this.twoPlayers) {
            this.gameOver = true;
            this.twoPlayers = true;
            this.wordDivs.splice(0);
            try {
                this.currentWord = prompt("Enter a word!").toUpperCase();
            }
            catch(e) {
                this.onePlayer();
                return;
            }
            var letters = /^[A-Za-z]+$/;
            while (!letters.test(this.currentWord)) {
                try {
                    this.currentWord = prompt("Only letters please! Enter a word:").toUpperCase();
                }
                catch(e) {
                    this.onePlayer();
                    return;
                }
            }
            this.restart();
        }
    },
    playAgain: function() {
        if (this.twoPlayers) {
            try {
                this.currentWord = prompt("Enter a word!").toUpperCase();
            }
            catch(e) {
                this.onePlayer();
                return;
            }
            var letters = /^[A-Za-z]+$/;
            while (!letters.test(this.currentWord)) {
                try {
                    this.currentWord = prompt("Only letters please! Enter a word:").toUpperCase();
                }
                catch(e) {
                    this.onePlayer();
                    return
                }
            }
        }
        else {
            this.currentWord = this.words[randomInteger(0, this.words.length - 1)];
        }
        this.restart();
    }
},

// identify the canvas element and initialize it, draw the gallows, choose a word, and draw the blanks
mounted: function() {
    this.canvas = document.getElementById("board-canvas");
    this.canvas.width = document.getElementById("board").offsetWidth;
    this.canvas.height = document.getElementById("board").offsetHeight;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.lineWidth = 2;
    this.drawGallows(this.ctx);
this.currentWord = this.words[randomInteger(0, this.words.length - 1)];
    this.makeBlanks();
}
});