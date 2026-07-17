import React from "react";
import Tile from "../Tile/Tile";
import styles from  "./Column.module.css";
import { Props } from "./types";

//Exports Column and prevents re-renders if props haven't changed
export default class Column extends React.PureComponent<Props> {

    render() {
        //Extracts variables from incoming properties
        const { column, rows, chipsPositions, onTileClick } = this.props;
        const tiles = [];

        //Loops incrementally from row 0 to the maximum number of rows
        for (let row = 0; row < rows; row++){
            //Uses a template literal to combine row:column into coordinates (0:2, 5;4)
            const tileId = `${row}:${column}`;
            //Queries chipsPositions dictionary using the tileId as a key (to check status of that chip)
            const chipType = chipsPositions[tileId];
            //Adds created element (with properties) to tiles array in each loop cycle
            tiles.push(
                <Tile
                    key={tileId}
                    id={tileId}
                    chipType={chipType}
                    onClick={onTileClick}
                />
            );
        }
        //Wraps array in column-based CSS
        return <div className={styles.column}>{tiles}</div>;
    }
}