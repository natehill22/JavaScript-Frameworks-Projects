import {BaseElement} from './base-element.js';

export class DataTable extends BaseElement { //Allows the class to be imported and re-used

    //Initializes components with headers and (table) data
    constructor(headers, data) {
        super();
        this.headers = headers;
        this.data = data;
    }


    getElementString() {

        //Cycles through all headers and places them on the <th> row of the created table
        let thTags = '';
        for (let h of this.headers) {
            thTags += `<th class="mdl-data-table__cell--non-numeric">${h}</th>`
        }

        //Cycles through all data items and places them on the <td> cells within <tr> rows within the created table
        let trTags = '';
        for (let row of this.data) {
            trTags += `<tr>`;
            let tdTags = '';
            for (let property of this.headers) {
                let field = row[property.toLowerCase()]; //Data items are normalized to lowercase (to handle case-insensitive property lookups)
                trTags += `<td class="mdl-data-table__cell--non-numeric">
                            ${field}
                            </td>
                            `;
            }
            trTags += '</tr>';
        }

        //Returns table with formatting and piped in data
        return `
        <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
            <thead>
                <tr>
                    ${thTags}
                </tr>
            </thead>
            <tbody>
                ${trTags}
            </tbody>
        </table>
        `;
    }
}