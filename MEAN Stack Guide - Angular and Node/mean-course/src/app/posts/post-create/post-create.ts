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
    public postsService = inject(PostsService); //Gives access to data operations within PostsService
    private authService = inject(AuthService); //Gives access to user session states within AuthService

    //Declares postId as a Signal Input, which pulls the active post's id out of the URL path
    postId = input<string | undefined>();

    //Sets up local visibility state signals (with defaults)
    isLoading = signal<boolean>(false); //Tracks if a network call is downloading data
    imagePreview = signal<string | null>(null); //Tracks if a network call is caching image strings for file upload
    post = signal<Post | undefined>(undefined); //Tracks if a network call is holding post data
    mode = signal<'create' | 'edit'>('create'); //Tracks if a network call is toggling operations between create and edit

    //Creates data schema structure for forms
    form = new FormGroup({
        'title': new FormControl<string | null>(null, {validators: [Validators.required, Validators.minLength(3)] }), //Enforce string length of 3
        'content': new FormControl<string | null>(null, {validators: [Validators.required] }),
        'image': new FormControl<File | string | null>(null, {validators: [Validators.required], asyncValidators: [mimeType] }) //Uses mimeType file validator
    });
    
    //Monitors login session/authentication updates through class body
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
            //If a currentPostId lands via the URL, sets layout mode to edit and loads spinner
            if (currentPostId) { 
                this.mode.set('edit');
                this.isLoading.set(true);

                //Fetches a single post's details from the db
                this.postsService.getPost(currentPostId).subscribe({
                    next: (postData) => { //Once returned, stop the spinner
                        this.isLoading.set(false);
                        //Creates a temporary object for changing backend properties to frontend ones
                        const mappedPost: Post = { 
                            id: postData._id,
                            title: postData.title,
                            content: postData.content,
                            imagePath: postData.imagePath,
                            creator: postData.creator
                        };
                        this.post.set(mappedPost); //Saves new object into post Signal state
                        this.imagePreview.set(postData.imagePath); //Renders the existing post image in the UI (by updating signal with a backend URL image string)

                        //Populates input fields with retrieved data 
                        this.form.setValue({
                            title: mappedPost.title,
                            content: mappedPost.content,
                            image: mappedPost.imagePath
                        });
                    },
                    error: () => this.isLoading.set(false) //Turns off spinner if request fails
                });
            } else {
                //If currentPostId is null or undefined, set layout to create and clear out cached post data
                this.mode.set('create');
                this.post.set(undefined);
                this.imagePreview.set(null);
                this.form.reset();
            }
        });
    }

    //Extracts a file from an input field, attaches it to a reactive Form, and generates a visual preview
    onImagePicked(event: Event) {
        //Tells TS that the target of the event is a file input element, which lets it read the .files list
        const files = (event.target as HTMLInputElement).files; 
        if (!files || files.length === 0) return; //If the file list is empty or undefined, stops executing

        const file = files[0]; //Pulls the first file in the array
        this.form.patchValue({ image: file }); //Inserts File into the image control of reactive Form
        this.form.get('image')?.updateValueAndValidity(); //Re-runs any validators (which updates status flags and helps form function)

        //Reads the contents of the file, converts it to an encoded string, and then renders it
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview.set(reader.result as string); //Applies the encoded image string to the imagePreview, rendering the image
        };
        reader.readAsDataURL(file); //Converts file's binary into an encoded URL string
    }

    //Validates user input, handles creation and editing states, and resets the form when users click Submit
    onSavePost() {
        if (this.form.invalid) return; //If the form is empty or invalid, stops executing
        
        this.isLoading.set(true); //Turns on spinner while to display loading state
        //Pulls current form values and places them into a temporary object
        const formValue = this.form.value;

        //Pushes form values to services creation method if mode = create
        if (this.mode() === 'create') {
            this.postsService.addPost(formValue.title!, formValue.content!, formValue.image! as File);
            //Pushes form values to services update method if mode = edit, (id is used to target post)
        } else {
            this.postsService.updatePost(this.postId()!, formValue.title!, formValue.content!, formValue.image!);
        }
        this.form.reset(); //Resets all input values
    }
}