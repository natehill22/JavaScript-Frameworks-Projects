import React from "react";
import Board from "../Board/Board";
import styles from  "./App.module.css";
import { Props, State, ChipsPositions } from "./types";

//Exports Board and prevents re-renders if props haven't changed
export default class App extends React.PureComponent<Props, State> {
    //Represents the memory of the game
    state: State = { 
        chipsPositions: {}, //A key-value lookup that tracks where pieces are
        playerTurn: "red", //Tracks who plays next. Red goes first
        gameStatus: "It's red's turn" //Displays message to players
    };

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

        //TODO Diagonally

        //Returns a continue message both horizontal and vertical loops complete without a win
        return `It's ${playerTurn}'s turn`;
    };

    //Runs when any slot on the board is clicked
    handleTileClick = (tileId: string) => {
        const { chipsPositions, playerTurn } = this.state; //Grabs current gameboard configuration and current player's color from state

        //Gets lowest available empty tile spot of the column
        const column = parseInt(tileId.split(":")[1]); //Grabs the clicked tiles column number from its tileId (and converts it to integer)
        let lastEmptyTileId = this.getLastEmptyTile(column); //Sets lowest empty spot to the variable lastEmptyTileId

        //Do nothing if there's no empty tile in the column
        if (!lastEmptyTileId) {
            return;
        }

        //Adds chip to empty tile
        const newChipsPositions = {
            ...chipsPositions, 
            [lastEmptyTileId]: playerTurn
        };

        //Changes player turn
        const newPlayerTurn = playerTurn === "red" ? "yellow" : "red";

        //Calculates game status
        const gameStatus = this.calculateGameStatus(newPlayerTurn, newChipsPositions);

        //Saves new state
        this.setState({ chipsPositions: newChipsPositions, playerTurn: newPlayerTurn, gameStatus });
    };

    getLastEmptyTile(column: number) {
        const { rows } = this.props;
        const { chipsPositions } = this.state;

        for (let row = rows - 1; row >= 0; row--) {
            const tileId = `${row}:${column}`;

            if (!chipsPositions[tileId]) {
                return tileId;
            }
        }
    }

    renderBoard() {
        //Extracts variables from incoming properties
        const { columns, rows } = this.props;
        const { chipsPositions } = this.state;
        return (
            <Board
                    columns={columns}
                    rows={rows}
                    chipsPositions={chipsPositions}
                    onTileClick={this.handleTileClick}
            />
        );       
    }

    renderStatusMessage() {
        const { gameStatus } = this.state;
        return <div className={styles.statusMessage}>{gameStatus}</div>;
    }

    render() {
        return (
            <div className={styles.app}>
                {this.renderBoard()}
                {this.renderStatusMessage()}
            </div>
        );
    }
}