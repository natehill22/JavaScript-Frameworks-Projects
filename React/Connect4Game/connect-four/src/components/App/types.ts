//Defines the ChipsPosition object (a dictionary for each position that allows values of cyan, green, or empty)
export interface ChipsPositions {
    [key: string]: Player;
}

export type Player = "cyan" | "green" | "";
//Defines Props as needing the number of columns and rows in order to initialize
export interface Props {
    columns: number;
    rows: number;
}
//Defines State as all the information stored by the component (position of chips, status, player turns)
export interface State {
    chipsPositions: ChipsPositions;
    gameStatus: string;
    playerTurn: Player;
}