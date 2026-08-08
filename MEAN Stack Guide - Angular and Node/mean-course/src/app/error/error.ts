import { Component, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from "@angular/material/dialog";
import { MatAnchor } from "@angular/material/button";

@Component({
    templateUrl: './error.html',
    imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatAnchor, MatDialogClose]
})

export class ErrorComponent {
    //Injects Material Dialog data context (the error message)
    public data = inject<{ message: string }>(MAT_DIALOG_DATA);
}