import React from "react";
import Column from "../Column/Column";
import styles from  "./Board.module.css";
import { Props } from "./types";

//Exports Board and prevents re-renders if props haven't changed
export default class Board extends React.PureComponent<Props> {

    renderColumns() {
        //Extracts variables from incoming properties
        const { columns, rows, chipsPositions, onTileClick } = this.props;
        const columnsComponents = [];

        //Loops incrementally from column 0 to the maximum number of columns
        for (let column = 0; column < columns; column++){
            //Adds created element (with properties) to columnsComponents array in each loop cycle
            columnsComponents.push(
                <Column
                    key={column}
                    column={column}
                    rows={rows}
                    chipsPositions={chipsPositions}
                    onTileClick={onTileClick}
                />
            );
        }
        //Displays the full columnsComponents array
        return <>{columnsComponents}</>;
    }

    //Wraps rendered content in board-based CSS
    render() {
        return <div className={styles.board}>{this.renderColumns()}</div>
    }
}