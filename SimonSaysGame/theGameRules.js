// The Game Rules

$(function() {
    var colors = $('#colors li'); //Creates variable for all li elements within color ID
    var start = $('#start'); //Creates variable for element with start ID
    var gameState = 'waiting'; //Sets gameState variable to 'waiting'
    var gameSequence = new Array(); //Sets gameSequence to a new empty array
    var level = 1; //Sets level to 1
    var flashNo;
    var clickedNo;

    //Creates animated loading where each square slides in from a different side upon page load
    colors.each(function(index) { //Loops through all color elements and accepts an index 
        var startPos = {}; //Creates an empty startPos object

        //Defines/sets starting points based upon index (and populates the startPos object)
        if (index === 0) startPos = { top: '-100vh', left: '0' }; //Magenta slides from the top
        if (index === 1) startPos = { top: '0', left: '100vw' }; //Green slides from the right
        if (index === 2) startPos = { top: '0', left: '-100vw' }; //Blue slides from the left
        if (index === 3) startPos = { top: '100vh', left: '0' }; //Purple slides from the bottom

        $(this) //For the current element
            .css($.extend({ position: 'relative' }, startPos)) //Sets relative positioning while merging existing positioning data
            .delay(index * 250) //Adds a delay between all looped elements creating a staggered entrance
            .animate({ //Moves the elements from their starting positions to their original positions
                top: '0', 
                left: '0', 
            }, 1200); //Within a timeframe of 1200ms
    });

    var setupLightSequence = function() {
        var randomNum = Math.floor(Math.random() * 4); //Generates random rounded number between 0-3
        gameSequence[level - 1] = randomNum; //Stores generated number into gameSequence array at the current level's position
        showLightSequence(); 
    };
    var lightOn = function(no) {
        colors.eq(gameSequence[no]).addClass('on'); //Adds "on" class to the selected color block within the game sequence
    };
    var lightOff = function() {
        colors.removeClass('on'); //Removes the "on" class from all blocks
    };
    var showLightSequence = function() {
        lightOff(); //Turns off all lights, ensuring clean state

        if (flashNo < level) { //If current flash index is less than current level,
            var on = setTimeout(function() {
                lightOn(flashNo); //Turn color block on using flashNo as "no" in the LightOn function
                var off = setTimeout(function() {
                    flashNo++; //Increment flashNo
                    showLightSequence(); //Recursively calls itself to display the next light (or move on)
                }, 500); //within a 500ms timeframe
            }, 500); //within a 500ms timeframe
        }
        else {
            gameState = 'playing'; //Sets gameState to 'playing'
            $('body').addClass('playing'); //Adds a 'playing' class to the body
            start.text('Your turn...'); //Updates start button text
            clearTimeout(on); //Stops sequence loop
        }
    };

    colors.click(function() { //Attaches a click-handler to game buttons/squares
        if(gameState == 'playing') { //Ensures clicks are only registered when the game is in 'playing' state
            $(this).fadeOut(250).fadeIn(250); //Clicked color boxes will fade out and in quickly
            var selectedSquare = $(this).index(); //Identifies which square was clicked by index #

            //Correct move logic
            if(gameSequence[clickedNo] == selectedSquare) { //Compares clicked square's index against expected square in gameSequence array (using clickedNo)
                if(clickedNo == level - 1) { //If the player has reached the end of the sequence,
                    gameState = 'waiting'; //Set gameState to waiting, remove 'playing' class, update display text, and increment level
                    $('body').removeClass('playing');
                    start.text('WELL DONE. Go to the next level >');
                    level++;
                }

                //Displays brief flash effect upon activated square
                lightOn(clickedNo); 
                var off = setTimeout(function() {
                    lightOff();
                    clickedNo++; //Increments tracker to await next input
                }, 25);
            }

            //Incorrect move logic
            else { //If gameSequence[clickedNo] doesn't match selectedSquare, the player made a mistake
                gameState = 'waiting'; //Sets gameState to 'waiting', removes 'playing' class, adds 'game-over' class, and updates text
                $('body').removeClass('playing').addClass('game-over');
                start.text('GAME OVER. Try again?');
                gameSequence = new Array(); //Clears sequence to reset game

                level = 1 //Resets game to level 1
            }
        }
    });

    //Initializes game
    var init = function() {
        $('#level').text('Level ' + level); //Updates HTML to display current level
        flashNo = 0; //Resets sequence and click counters
        clickedNo = 0;
        $(this).text('Simon Says...'); //Updates start text
        $('body').removeClass('game-over'); //Removes 'game-over' class
        $('#colors li.magenta').animate({top: "0px"}, 1000);
        setupLightSequence(); 
    }
    start.click(init); //Attaches init function to the click of start text
});