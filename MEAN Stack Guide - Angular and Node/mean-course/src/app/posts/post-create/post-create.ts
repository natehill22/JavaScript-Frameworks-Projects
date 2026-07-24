import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, NgForm } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";

import { PostsService } from "../posts.service";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.html',
    imports: [CommonModule, FormsModule, MatInputModule, MatCardModule, MatButtonModule],
    styleUrls: ['./post-create.css']
})
export class PostCreateComponent {
    enteredTitle = '';
    enteredContent = '';

    constructor(public postsService: PostsService) {
        console.log("Create Component Service ID:", (postsService as any).__proto__);
    }

    onAddPost(form: NgForm) {
        if (form.invalid) {
            return;
        }
        
        this.postsService.addPost(form.value.title, form.value.content);
    }
}