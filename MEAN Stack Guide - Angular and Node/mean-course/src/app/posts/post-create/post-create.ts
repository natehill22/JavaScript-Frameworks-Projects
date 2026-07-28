import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

import { PostsService } from "../posts.service";
import { Post } from "../post.model";
import { mimeType } from "./mime-type.validator";


@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.html',
    imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatCardModule, MatButtonModule, MatProgressSpinner],
    styleUrls: ['./post-create.css']
})
export class PostCreateComponent implements OnInit {
    enteredTitle = '';
    enteredContent = '';
    post: Post | undefined;
    isLoading = false;
    form!: FormGroup;
    imagePreview!: string;
    private mode = 'create';
    private postId: string = '';
    

    constructor(public postsService: PostsService, public route: ActivatedRoute, private cdRef: ChangeDetectorRef) {
        console.log("Create Component Service ID:", (postsService as any).__proto__);
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            'title': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
            'content': new FormControl(null, {validators: [Validators.required]}),
            'image': new FormControl (null, {validators: [Validators.required], asyncValidators: [mimeType]})
        });
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('postId')) {
                this.mode = 'edit';
                this.postId = paramMap.get('postId') ?? '';
                this.isLoading = true;
                //Fetches post data asynchronously from server
                this.postsService.getPost(this.postId).subscribe(postData => {
                    this.isLoading = false;
                    this.post = {id: postData._id, title: postData.title, content: postData.content};
                    this.form.setValue({'title': this.post.title, 'content': this.post.content});
                    this.enteredTitle = this.post.title;
                    this.enteredContent = this.post.content;
                });
            } else {
                this.mode = 'create';
                this.postId = '';
            }
        });
    }

    onImagePicked(event: Event) {
        const file = (event.target as HTMLInputElement).files![0];
        this.form.patchValue({image: file});
        this.form.get('image')?.updateValueAndValidity();
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result as string;
        };
        reader.readAsDataURL(file);
    }

    onSavePost() {
        if (this.form.invalid) {
            return;
        }
        this.isLoading = true;
        if (this.mode === 'create') {
            this.postsService.addPost(this.form.value.title, this.form.value.content);
        } else {
            this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content)
        }
        this.form.reset();
    }
}