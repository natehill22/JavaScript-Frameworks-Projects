import { Component, signal, inject, input, effect } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { toSignal } from "@angular/core/rxjs-interop";

import { PostsService } from "../posts.service";
import { AuthService } from "../../auth/auth.service";
import { Post } from "../post.model";
import { mimeType } from "./mime-type.validator";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.html',
    imports: [ReactiveFormsModule, MatInputModule, MatCardModule, MatButtonModule, MatProgressSpinner],
    styleUrls: ['./post-create.css']
})
export class PostCreateComponent {
    public postsService = inject(PostsService);
    private authService = inject(AuthService);

    //Route params automatically bind to this signal if enabled 
    postId = input<string | undefined>();

    //Component State Signals
    isLoading = signal<boolean>(false);
    imagePreview = signal<string | null>(null);
    post = signal<Post | undefined>(undefined);
    mode = signal<'create' | 'edit'>('create');

    //Form initialization
    form = new FormGroup({
        'title': new FormControl<string | null>(null, {validators: [Validators.required, Validators.minLength(3)] }),
        'content': new FormControl<string | null>(null, {validators: [Validators.required] }),
        'image': new FormControl<File | string | null>(null, {validators: [Validators.required], asyncValidators: [mimeType] })
    });
    
    //Handle authentication updates without manual subscriptions
    private authStatusSignal = toSignal(this.authService.getAuthStatusListener());

    constructor() {
        //Automatically turns off loader when auth status updates
        effect(() => {
            if (this.authStatusSignal() !== undefined) {
                this.isLoading.set(false);
            }
        });

        //Automatically reacts and fetches data whenever the postId input signal changes
        effect(() => {
            const currentPostId = this.postId();
            if (currentPostId) {
                this.mode.set('edit');
                this.isLoading.set(true);

                this.postsService.getPost(currentPostId).subscribe({
                    next: (postData) => {
                        this.isLoading.set(false);
                        const mappedPost: Post = {
                            id: postData._id,
                            title: postData.title,
                            content: postData.content,
                            imagePath: postData.imagePath,
                            creator: postData.creator
                        };
                        this.post.set(mappedPost);
                        this.imagePreview.set(postData.imagePath);

                        this.form.setValue({
                            title: mappedPost.title,
                            content: mappedPost.content,
                            image: mappedPost.imagePath
                        });
                    },
                    error: () => this.isLoading.set(false)
                });
            } else {
                this.mode.set('create');
                this.post.set(undefined);
                this.imagePreview.set(null);
                this.form.reset();
            }
        });
    }

    onImagePicked(event: Event) {
        const files = (event.target as HTMLInputElement).files;
        if (!files || files.length === 0) return;

        const file = files[0];
        this.form.patchValue({ image: file });
        this.form.get('image')?.updateValueAndValidity();

        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview.set(reader.result as string);
        };
        reader.readAsDataURL(file);
    }

    onSavePost() {
        if (this.form.invalid) return;
        
        this.isLoading.set(true);
        const formValue = this.form.value;

        if (this.mode() === 'create') {
            this.postsService.addPost(formValue.title!, formValue.content!, formValue.image! as File);
        } else {
            this.postsService.updatePost(this.postId()!, formValue.title!, formValue.content!, formValue.image!);
        }
        this.form.reset();
    }
}