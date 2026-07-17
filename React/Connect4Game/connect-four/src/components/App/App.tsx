import React from "react";
import Board from "../Board/Board";
import styles from  "./App.module.css";
import { Props, State, ChipsPositions } from "./types";
import typewritersoftclick from "../../sounds/typewritersoftclick.wav"
import gamemusicloop from "../../sounds/gamemusicloop.mp3"

//Exports Board and prevents re-renders if props haven't changed
export default class App extends React.PureComponent<Props, State> {
    soundclick = new Audio(typewritersoftclick);
    gamemusic = new Audio(gamemusicloop);

    //Represents the memory of the game
    state: State = { 
        chipsPositions: {}, //A key-value lookup that tracks where pieces are
        playerTurn: "cyan", //Tracks who plays next. Cyan goes first
        gameStatus: "It's cyan's turn" //Displays message to players
    };

    componentDidMount() {
        this.gamemusic.loop = true; //Enables infinte looping
        this.gamemusic.volume = 0.5; //Balances sound between music and sound effects

        this.gamemusic.play().catch(error => {
            console.log("Autoplay blocked by browser. Music will wait for user interaction.", error);
        });
    }

    componentWillUnmount() {
        //Reset audio timeline to 0 and pauses music when player leaves page
        this.gamemusic.pause();
        this.gamemusic.currentTime = 0
    }

    //Runs after every move to determine if a player has won
    calculateGameStatus = (playerTurn: string, chipsPositions: ChipsPositions): string => {
        const { columns, rows } = this.props; //Extracts columns and rows to know the board grid's boundaries

        //Checks four in a row horizontally
        for (let row = 0; row < rows; row++) { //Runs through each row incrementing until max rows are met
            let repetitionCountStatus = { playerChip: "", count: 0 }; //Resets the count for each row

            for (let column = 0; column < columns; column++) { //Runs through each column incrementing until max columns are met
                const chip = chipsPositions[`${row}:${column}`]; //Uses location key to pulls chip value/color

                //Counts chip (color) streak for the players
                if (chip && chip === repetitionCountStatus.playerChip) {
                    repetitionCountStatus.count++; //Increments color's streak count if it matches the color in previous slot
                } else {
                    repetitionCountStatus = { playerChip: chip, count: 1 }; //Otherwise alter the color setting and reduce count to 1 (current)
                }

                //If count/streak for player reaches 4, that player wins
                if (repetitionCountStatus.count === 4) {
                    return `Player ${repetitionCountStatus.playerChip} won!`;
                }
            }
        }

        //Checks four in a row vertically
        for (let column = 0; column < columns; column++) { //Runs through each column incrementing until max columns are met
            let repetitionCountStatus = { playerChip: "", count: 0 }; //Resets the count for each row

            for (let row = 0; row < rows; row++) { //Runs through each row incrementing until max rows are met
                const chip = chipsPositions[`${row}:${column}`]; //Uses location key to pulls chip value/color
                
                //Counts chip (color) streak for the players
                if (chip && chip === repetitionCountStatus.playerChip) {
                    repetitionCountStatus.count++; //Increments color's streak count if it matches the color in previous slot
                } else {
                    repetitionCountStatus = { playerChip: chip, count: 1 }; //Otherwise alter the color setting and reduce count to 1 (current)
                }

                //If count/streak for player reaches 4, that player wins
                if (repetitionCountStatus.count === 4) {
                    return `Player ${repetitionCountStatus.playerChip} won!`;
                }
            }
        }

        //Checks 4-in-a-row diagonally descending (top-left to bottom-right)
        for (let row = 0; row <= rows - 4; row++) { //Limits loops to (rows - 3) and (columns - 3) because 4-in-a-row cannot start past that
            for (let column = 0; column <= columns - 4; column++) {
                const chip1 = chipsPositions[`${row}:${column}`]; //Pattern matches 4 diagonal descending tiles
                const chip2 = chipsPositions[`${row + 1}:${column + 1}`];
                const chip3 = chipsPositions[`${row + 2}:${column + 2}`];
                const chip4 = chipsPositions[`${row + 3}:${column + 3}`];

                if (chip1 && chip1 === chip2 && chip1 === chip3 && chip1 === chip4) {
                    return `Player ${chip1} won!`; //Makes sure all chips in line are the same color
                }
            }
        }

        //Checks 4-in-a-row diagonally ascending (bottom-left to top-right)
        for (let row = 3; row < rows; row++) { //Starts row loop at 3 and starts with (columns - 4) to limit 4-in-a-row potentials
            for (let column = 0; column <= columns - 4; column++) {
                const chip1 = chipsPositions[`${row}:${column}`]; //Pattern matches 4 diagonal ascending tiles
                const chip2 = chipsPositions[`${row - 1}:${column + 1}`];
                const chip3 = chipsPositions[`${row - 2}:${column + 2}`];
                const chip4 = chipsPositions[`${row - 3}:${column + 3}`];

                if (chip1 && chip1 === chip2 && chip1 === chip3 && chip1 === chip4) {
                    return `Player ${chip1} won!`; //Makes sure all chips in line are the same color
                }
            }
        }

        //Returns a continue message both horizontal and vertical loops complete without a win
        return `It's ${playerTurn}'s turn`;
    };

    //Runs when any slot on the board is clicked
    handleTileClick = (tileId: string) => {
        const { chipsPositions, playerTurn } = this.state; //Grabs current gameboard configuration and current player's color from state

        //Plays background music upon first interaction if not started already (skirts security restrictions)
        if (this.gamemusic.paused) {
            this.gamemusic.loop = true;
            this.gamemusic.volume = 0.5;
            this.gamemusic.play().catch(error => console.log("Audio playback failed:", error));
        }

        //Gets lowest available empty tile spot of the column
        const column = parseInt(tileId.split(":")[1]); //Grabs the clicked tiles column number from its tileId (and converts it to integer)
        let lastEmptyTileId = this.getLastEmptyTile(column); //Sets lowest empty spot to the variable lastEmptyTileId

        //Do nothing if there's no empty tile in the column
        if (!lastEmptyTileId) {
            return;
        }

        //Reset audio timeline to 0 and play (allows rapid consecutive clicks)
        this.soundclick.currentTime = 0;
        this.soundclick.play();

        //Adds chip to empty tile
        const newChipsPositions = { //Creates new object containing all existing chip locations
            ...chipsPositions, 
            [lastEmptyTileId]: playerTurn //Overwrites lastEmptyTileId coordinate with the current player's color {"5:4": "cyan"}
        };

        //Changes player turn
        const newPlayerTurn = playerTurn === "cyan" ? "green" : "cyan"; //Uses ternary to switch who plays next

        //Calculates game status with updated board state and next player's turn, which runs above loops to see if anyone's won
        const gameStatus = this.calculateGameStatus(newPlayerTurn, newChipsPositions);

        //Updates component state with new board positions, player turns, and status message
        this.setState({ chipsPositions: newChipsPositions, playerTurn: newPlayerTurn, gameStatus });
    };

    //Holds the "gravity" mechanic, which enforces a clicked tile to place the chip at the lowest free row in the column
    getLastEmptyTile(column: number) {
        const { rows } = this.props; //Grabs total number of board rows
        const { chipsPositions } = this.state; //Grabs object holding currently placed chips

        for (let row = rows - 1; row >= 0; row--) { //Runs a decrementing loop starting from the highest row number (which equals the lowest row)
            const tileId = `${row}:${column}`; //Combines clicked row index with the unchanging column

            if (!chipsPositions[tileId]) {
                return tileId; //If current coordinate doesn't have an existing color value, places a chip (with handleTileClick)
            }
        }
    }

    renderBoard() {
        const { columns, rows } = this.props; //Extracts layout dimensions
        const { chipsPositions } = this.state; //Extracts current game piece locations
        return (
            <Board
                    columns={columns} //Tells the board how large a grid to draw
                    rows={rows}
                    chipsPositions={chipsPositions} //Passes a map of placed game pieces
                    onTileClick={this.handleTileClick} //Links board's click actions directly to handleTileClick state
            />
        );       
    }

    //Renders text updates
    renderStatusMessage() {
        const { gameStatus } = this.state; //Grabs active status message
        return <div className={styles.statusMessage}>{gameStatus}</div>; //Returns a div containing above message with attached CSS styles
    }

    render() {
        return (
            <div className={styles.app}> {/* Master container styled with CSS to show board and message */}
                {this.renderBoard()}
                {this.renderStatusMessage()}
            </div>
        );
    }
}