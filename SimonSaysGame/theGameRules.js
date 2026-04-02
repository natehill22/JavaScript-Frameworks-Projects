// The Game Rules

$(function() {
    var colors = $('#colors li'); //Creates variable for all li elements within color ID
    var mainColor = $('#main'); 
    var start = $('#start'); //Creates variable for element with start ID
    var gameState = 'waiting'; //Sets gameState variable to 'waiting'
    var gameSequence = new Array(); //Sets gameSequence to a new empty array
    var level = 1; //Sets level to 1
    var t;
    var flashNo;
    var clickedNo;
    //
    var setupLightSequence = function() {
        var randomNum = Math.floor(Math.random() * 4);
        gameSequence[level-1] = randomNum;
        showLightSequence();
    };
    var lightOn = function(no) {
        colors.eq(gameSequence[no]).addClass('on');
    };
    var lightOff = function() {
        colors.removeClass('on');
    };
    var showLightSequence = function() {
        lightOff();

        if (flashNo < level) {
            var on = setTimeout(function() {
                var off = setTimeout(function() {
                    showLightSequence();
                    flashNo++;
                }, 500);
                lightOn(flashNo);
            }, 500);
        }
        else {
            gameState = 'playing';
            $('body').addClass('playing');
            start.text('Your turn...');
            clearTimeout(on);
        }
    };

    colors.click(function() {
        if(gameState == 'playing') {
            $(this).fadeOut(500).fadeIn(500);
            var selectedSquare = $(this).index();
            var selectedColor = $(this).css('background-color');

            if(gameSequence[clickedNo] == selectedSquare) {
                if(clickedNo == level-1) {
                    gameState = 'waiting';
                    $('body').removeClass('playing');
                    start.text('WELL DONE. Go to the next level >');
                    level++;
                }

                lightOn(clickedNo);
                var off = setTimeout(function() {
                    lightOff();
                    clickedNo++;
                }, 200);
            }
            else {
                gameState = 'waiting';
                $('body').removeClass('playing');
                start.text('GAME OVER. Try again?');
                $('body').removeClass('playing').addClass('game-over');
                gameSequence = new Array();

                level = 1
            }
        }
    });

    var init = function() {
        $('#level').text('Level ' + level);
        flashNo = 0;
        clickedNo = 0;
        $(this).text('Simon Says...');
        $('body').removeClass('game-over');
        setupLightSequence();
    }
    start.click(init);
});