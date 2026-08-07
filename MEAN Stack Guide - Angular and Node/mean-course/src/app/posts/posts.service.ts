import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { Post } from './post.model';

//Constructs the API endpoint path and places that URL into the BACKEND_URL variable
const BACKEND_URL = environment.apiUrl + "/posts/";

//Marks class as a globally available injectable service (as a singleton)
@Injectable({ providedIn: 'root' })
export class PostsService {
    private http = inject(HttpClient); //Helps make API requests
    private router = inject(Router); //Helps navigate between pages

    //Tracks active pagination params (page number, # of posts per page) as signals
    private paginationParams = signal({ postsPerPage: 2, currentPage: 1 });

    //Exposes parameters so components can safely read the single source of truth
    currentParams = computed(() => this.paginationParams());

    //Automatically fetches data from backend whenever paginationParams change
    private postsResource = rxResource({
        params: () => this.paginationParams(),
        stream: ({ params }) => {
            //Creates a JS template literal that appends pagination parameters to a URL
            const queryParams = `?pagesize=${params.postsPerPage}&page=${params.currentPage}`;
            //Returns the updated backend URL with type shape for the expected JSON response body (posts, maxPosts, etc.)
            return this.http.get<{ message: string, posts: any[]; maxPosts: number }>(BACKEND_URL + queryParams).pipe(
                //Intercepts backend response object (postData) to transform its structure
                map((postData) => ({
                    posts: postData.posts.map((post) => ({ //Creates a new posts array by looping through the backend's posts array
                        //Extracts properties from backend post objects and assigns it to new frontend objects
                        title: post.title,
                        content: post.content,
                        id: post._id, //Changes mongoDB's _id to id to match the frontend Post model
                        imagePath: post.imagePath,
                        creator: post.creator
                    })),
                    maxPosts: postData.maxPosts //Extracts total post count from backend response and carries it forward
                }))
            );
        }
    });

    //Exposes read-only signals for components to bind to
    posts = computed(() => this.postsResource.value()?.posts ?? []); //Holds the posts array
    totalPosts = computed(() => this.postsResource.value()?.maxPosts ?? 0); //Holds total count for pagination
    isLoading = this.postsResource.isLoading; //Flags active network requests 

    //Updates pagination signals, triggering auto-refetch
    getPosts(postsPerPage: number, currentPage: number) {
        this.paginationParams.set({ postsPerPage, currentPage });
    }

    //Forces refetch of current backend data
    refreshPosts() {
        this.postsResource.reload();
    }

    //Retrieve's a single post's details by its id (returns an observable)
    getPost(id: string) {
        return this.http.get<{_id: string; title: string; content: string; imagePath: string; creator: string }>(BACKEND_URL + id);
    }

    //Uses FormData to package text fields and an image file together, sends that package in post request, and redirect to the home page
    addPost(title: string, content: string, image: File) {
        const postData = new FormData();
        postData.append("title", title);
        postData.append("content", content);
        postData.append("image", image, title);
        this.http
            .post<{ message: string; post: Post }>(BACKEND_URL, postData) //Saves the post into the database
            .subscribe(() => {
                this.router.navigate(["/"]).then(() => { 
                    this.refreshPosts(); //If successful, user gets redirected to a refreshed home page
                }); 
            });
    }

    //Modifies an existing post
    updatePost(id: string, title: string, content: string, image: File | string) {
        let postData: Post | FormData;
        //If image is a file object (new uploaded image), it uses FormData to upload (as in addPost)
        if(typeof(image) === 'object') {
            postData = new FormData();
            postData.append("id", id);
            postData.append("title", title);
            postData.append("content", content);
            postData.append("image", image, title);
        } else { //If image is a string (existing un-updated image), the image (and all else) is passed as a text-based JSON string
            postData = {id: id, title: title, content: content, imagePath: image, creator: ''};
        }
        this.http.put(BACKEND_URL + id, postData)
        .subscribe(() => this.router.navigate(["/"])); //Redirects users to main page upon success
    }

    //Sends a delete request to remove a post by its id and returns the Observable
    deletePost(postId: string) {
        return this.http.delete(BACKEND_URL + postId);
    }
}