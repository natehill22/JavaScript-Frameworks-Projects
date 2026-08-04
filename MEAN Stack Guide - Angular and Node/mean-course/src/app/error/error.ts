import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from "@angular/material/dialog";
import { MatAnchor } from "@angular/material/button";

@Component({
    templateUrl: './error.html',
    imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatAnchor, MatDialogClose]
})

export class ErrorComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}) {}
}