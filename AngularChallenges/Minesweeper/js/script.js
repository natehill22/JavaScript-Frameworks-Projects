function createMinefield() {
    let minefield = {};
    minefield.rows = [];

    //Creates a 9x9 grid of column and row arrays with defaults set to blank
    for (let y = 0; y < 9; y++) {
        let row = {};
        row.spots = [];

        for (let x = 0; x < 9; x++) {
            let spot = {}; //Objects will be used to keep track of state of the grid spot (covered, uncovered)
            spot.isCovered = true; //Tracks if the spot has been revealed. Defaults to covered
            spot.content = "empty"; //Tracks what is being stored in that spot (mine, number, empty). Defaults to empty
            row.spots.push(spot); //Adds all 9 spot objects to the row array
        }
        minefield.rows.push(row); //Adds all 9 row objects (containing 9 spot objects) to the minefield array
    }
    placeRandomMines(minefield); //Calls the function to place mines randomly in the grid
    calculateAllNumbers(minefield); //Determines the number of mines surrounding each spot in the minefield grid
    return minefield;
}

//Gets information about a specific spot
function getSpot(minefield, row, column) {
    return minefield.rows[row].spots[column];
}

//Adds 10 randomly-placed mines to the minefield
function placeRandomMines(minefield) {
    for (let i = 0; i < 10; i++) {
        let row = Math.round(Math.random() * 8); //0-8 = 9 possibilities
        let column = Math.round(Math.random() * 8); //Defines the limits of the grid and places random selections within it
        let spot = getSpot(minefield, row, column);
        spot.content = "mine";
    }
}

//Calculates the number of mines near a given spot (checks the 8 spots surrounding the given spot and tallies # of mines)
function calculateNumber(minefield, row, column) {
    let thisSpot = getSpot(minefield, row, column);

    //Can't place number here if this spot contains a mine
    if(thisSpot.content == "mine") {
        return;
    }

    let mineCount = 0; //Starts with a mineCount of 0 by default

    //Checks top-left if not in the first row or column
    if(row > 0) {
        if(column > 0) {
            let spot = getSpot(minefield, row -1, column -1);
            if(spot.content == "mine") {
                mineCount++; //Add 1 to mineCount if mine is present
            }
        }

        //Checks directly above if not in the first row
        let spot = getSpot(minefield, row - 1, column);
        if(spot.content == "mine") {
            mineCount++; //Add 1 to mineCount if mine is present
        }

        //Checks top-right if not in the first row or last column
        if(column < 8) {
            let spot = getSpot(minefield, row - 1, column + 1);
            if(spot.content == "mine") {
                mineCount++; //Add 1 to mineCount if mine is present
            }
        }
    }

    //Check directly left if not in the first column
    if(column > 0) {
        let spot = getSpot(minefield, row, column - 1);
        if(spot.content == "mine") {
            mineCount++; //Add 1 to mineCount if mine is present
        }
    }

    //Check directly right if not in the last column
    if(column < 8) {
        let spot = getSpot(minefield, row, column + 1);
        if(spot.content == "mine") {
            mineCount++; //Add 1 to mineCount if mine is present
        }
    }

    //Check bottom-left if not in the last row or first column
    if(row < 8) {
        if(column > 0) {
            let spot = getSpot(minefield, row + 1, column - 1);
            if(spot.content == "mine") {
                mineCount++; //Add 1 to mineCount if mine is present
            }
        }

        //Checks directly below if not in the last row
        let spot = getSpot(minefield, row + 1, column);
        if(spot.content == "mine") {
            mineCount++; //Add 1 to mineCount if mine is present
        }

        //Check bottom-right if not in the last row or column
        if(column < 8) {
            let spot = getSpot(minefield, row + 1, column + 1);
            if(spot.content == "mine") {
                mineCount++; //Add 1 to mineCount if mine is present
            }
        }
    }

    //Gives spot.content the value of the mineCount if the count is above 0; this will determine what image shows
    if(mineCount > 0) { 
        thisSpot.content = mineCount;
    }
}

//Iterates calculateNumber function over entire minefield object (all 81 spots)
function calculateAllNumbers(minefield) {
    for(let y = 0; y < 9; y++) {
        for(let x = 0; x < 9; x++) {
            calculateNumber(minefield, x, y);
        }
    }
}

//Checks every clicked spot for any uncovered non-mine spots
function hasWon(minefield) {
    for(let y = 0; y < 9; y++) {
        for(let x = 0; x < 9; x++) {
            let spot = getSpot(minefield, y, x);
            //If non-mine spots are still covered, no win condition
            if(spot.isCovered && spot.content != "mine") {
                return false;
            }
        }
    }
    return true; //Sets default to win condition (once restrictive condition above is no longer met, default is reached)
}

  //Creates a new Angular module named newApp with no dependencies
  const minesweeperModule = angular.module('minesweeperApp', []);

    //Creates controller and defines what services will be used
    const minesweeperController = function($scope) {

        $scope.minefield = createMinefield(); //Displays the minefield grid in the view
        //Checks if the user has uncovered a mine, and if not, calls the hasWon() function 
        $scope.uncoverSpot = function(spot) {
            spot.isCovered = false;

            if(spot.content == "mine") {
                $scope.hasLostMessageVisible = true;
            }
            else {
                if(hasWon($scope.minefield)) {
                    $scope.isWinMessageVisible = true;
                }
            }
        }
    }

    minesweeperModule.controller("minesweeperController", minesweeperController); //Defines controller name

    //Create a way to clear all spots around an empty spot when clicked upon
    //Create a way to label uncovered spots with flags
    //Create a way to reset game after losing or winning