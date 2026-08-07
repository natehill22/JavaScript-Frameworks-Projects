import { Component, signal, computed, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { RouterLink } from "@angular/router";

import { PostsService } from "../posts.service";
import { AuthService } from "../../auth/auth.service";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.html',
    imports: [MatExpansionModule, MatButtonModule, RouterLink, MatProgressSpinner, MatPaginatorModule],
    styleUrls: ['./post-list.css']
})

export class PostListComponent {
    public postsService = inject(PostsService); //Gives access to data operations within PostsService
    private authService = inject(AuthService); //Gives access to user session states within AuthService

    //Tracks pagination configuration on the PostService
    postsPerPage = computed(() => this.postsService.currentParams().postsPerPage);
    currentPage = computed(() => this.postsService.currentParams().currentPage);
    pageSizeOptions = [1, 2, 5, 10]; //Feeds selection options into the dropdown menu

    //Links UI template values directly to data within the service
    posts = this.postsService.posts; //Tracks array of items
    totalPosts = this.postsService.totalPosts; //Monitors global db count
    isLoading = this.postsService.isLoading; //Switches visibility of loading wheel

    //Manages authentication by automatically updating login state and userId
    private authStatusSignal = toSignal<boolean>(this.authService.getAuthStatusListener()); //Translates asynchronous login streams into synchronous state signals
    userIsAuthenticated = computed(() => this.authStatusSignal() ?? this.authService.getIsAuth()); //Determines if the user is logged in
    userId = computed(() => this.userIsAuthenticated() ? this.authService.getUserId() : ''); //Gets the ID of logged in user (if false, it clears the value and state)

    //Catches pagination events and shift index to align with backend's 0-index
    onChangedPage(pageData: PageEvent) {
        this.postsService.getPosts(pageData.pageSize, pageData.pageIndex + 1);
    }

    //Deletes post and hangles pagination issue
    onDelete(postId: string) {
        this.postsService.deletePost(postId).subscribe({
            next: () => {
                //Calculates how many posts remain on the current page before reloading
                const remainingPostsAfterDelete = this.totalPosts() - 1; //Subtracts 1 to account for the one deleted
                const postsPerPage = this.postsPerPage();
                const currentPage = this.currentPage();

                //Calculates total number of pages needed for remaining posts
                const remainingPages = Math.ceil(remainingPostsAfterDelete / postsPerPage);

                //Drops down by 1 page if current page is higher than remaining pages and we aren't on page 1
                if (currentPage > remainingPages && currentPage > 1) {
                    this.postsService.getPosts(postsPerPage, currentPage - 1); //Updates service parameters so the reload fetches the correct page
                } else {
                //Triggers reload to pull fresh dataset
                this.postsService.refreshPosts()
                }
            }                
        });
    }
}
