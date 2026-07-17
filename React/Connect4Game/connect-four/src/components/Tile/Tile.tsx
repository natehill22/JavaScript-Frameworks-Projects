import React from "react";
import classNames from "classnames";
import styles from  "./Tile.module.css";
import { Props } from "./types";

//Exports Tile and prevents re-renders if props haven't changed
export default class Tile extends React.PureComponent<Props> {
    render() {
        //Extracts variables from incoming properties. If onClick is empty, an empty function is run
        const {id, chipType, onClick = () => {} } = this.props;
        //Adds CSS classes (red if chipType is red, yellow otherwise)
        const chipCssClass = classNames(styles.chip, chipType === "cyan" ? styles.cyan : styles.green);

        return (
            //When tile is clicked, onClick function is triggered and passes the tile's id
            <div className={styles.tile} onClick={() => onClick(id)}>
                {/* Adds color to the tile if chipType has value */}
                {chipType && <div className={chipCssClass} />}
            </div>
        );
    }
}