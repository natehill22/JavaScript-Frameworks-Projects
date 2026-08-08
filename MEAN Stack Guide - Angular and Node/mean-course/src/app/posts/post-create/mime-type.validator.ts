import { AbstractControl } from "@angular/forms";
import { Observable, Observer, of } from "rxjs";

//Declares an asynchronous Form validator as either a promise or an observable
export const mimeType = (
    control: AbstractControl
    ): Promise<{ [key: string]: any } | null> | Observable<{ [key: string]: any } | null> => {

        //Passes validation if images field is empty or pre-existing (without being repalced)
        if (!control.value || typeof control.value === 'string') {
        return of(null);
        }

    const file = control.value as File; //Casts form control's value into a JS file
    const fileReader = new FileReader(); 
    //Creates an observable that listens for the end of the read file's buffer streaming
    const frObs = new Observable((observer: Observer<{ [key: string]: any } | null >) => {
        fileReader.addEventListener("loadend", () => {
            //Converts into an 8-bit integer array. Also pulls out the first 4 bytes which contain unique metadata identifiers
            const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4); 
            let header = "";
            let isValid = false;
            //Loops through the 4 byte integers, converts them into their string-based hexadecimal equivalent, and appends them to build an 8-character verification hash
            for (let i = 0; i < arr.length; i++) {
                header += arr[i].toString(16);
            }
            //Evaluates compiled hex string against a library of safe image format signatures
            switch (header) {
                case "89504e47": //PNG
                    isValid = true;
                    break;
                    //JPEG
                case "ffd8ffe0":
                case "ffd8ffe1":
                case "ffd8ffe2":
                case "ffd8ffe3":
                case "ffd8ffe8":
                    isValid = true;
                    break;
                default:
                    isValid = false; //Otherwise, mark it as invalid
                    break;
            }
            if (isValid) {
                observer.next(null); //Passes null if the file passes validation
            } else {
                observer.next({ invalidMimeType: true }); //Passes a validation error object, if invalid
            }
            observer.complete(); //Closes out the observer pipeline
        });
        fileReader.readAsArrayBuffer(file); //Triggers background execution thread (pulls bytes off the hard drive)
    });
    return frObs;
};