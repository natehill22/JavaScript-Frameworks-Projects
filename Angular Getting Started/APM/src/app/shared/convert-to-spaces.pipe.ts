import { Pipe, PipeTransform } from "@angular/core";

//Creates a custom pipe that replaces a string character with a space
@Pipe({
    name: 'convertToSpaces'
})

export class ConvertToSpacesPipe implements PipeTransform {

    transform(value: string, character: string): string {
        return value.replace(character, ' ');      
    }
}