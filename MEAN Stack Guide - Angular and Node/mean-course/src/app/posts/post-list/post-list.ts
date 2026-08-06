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
    public postsService = inject(PostsService);
    private authService = inject(AuthService);

    //Pagination State Signals
    postsPerPage = signal(2);
    currentPage = signal(1);
    pageSizeOptions = [1, 2, 5, 10];

    //Read state streams directly out of your service signals
    posts = this.postsService.posts;
    totalPosts = this.postsService.totalPosts;
    isLoading = this.postsService.isLoading; //Loads state Signal

    private authStatusSignal = toSignal<boolean>(this.authService.getAuthStatusListener());
    userIsAuthenticated = computed(() => this.authStatusSignal() ?? this.authService.getIsAuth());
    userId = computed(() => this.userIsAuthenticated() ? this.authService.getUserId() : '');

    constructor() {
        this.postsService.getPosts(this.postsPerPage(), this.currentPage());
    }


    onChangedPage(pageData: PageEvent) {
        this.currentPage.set(pageData.pageIndex + 1);
        this.postsPerPage.set(pageData.pageSize);
        this.postsService.getPosts(this.postsPerPage(), this.currentPage());
    }

    onDelete(postId: string) {
        this.postsService.deletePost(postId).subscribe({
            next: () => this.postsService.refreshPosts()
        });
    }
}
