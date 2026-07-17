import { ChipsPositions } from "../App/types";

//Defines Props as having a column, row, chipsposition, and a click event that will trigger
export interface Props {
    columns: number;
    rows: number;
    chipsPositions: ChipsPositions;
    onTileClick: (id: string) => any;
}