
export class DataError { //Allows the class to be imported and re-used

    //Initializes components with message and data
    constructor(message, data) {
        this.message = message;
        this.data = data;
    }
}