import { Component, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from "@angular/material/dialog";
import { MatAnchor } from "@angular/material/button";

@Component({
    templateUrl: './error.html',
    imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatAnchor, MatDialogClose]
})

export class ErrorComponent {
    //Modern injection of Material Dialog data context
    public data = inject<{ message: string }>(MAT_DIALOG_DATA);
}