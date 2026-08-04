import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { CommonModule } from "@angular/common";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { AuthService } from "../../auth/auth.service";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.html',
    imports: [CommonModule, MatExpansionModule, MatButtonModule, RouterLink, MatProgressSpinner, MatPaginatorModule],
    styleUrls: ['./post-list.css']
})

export class PostListComponent implements OnInit, OnDestroy {

   posts: Post[] = [];
   isLoading = false;
   totalPosts = 0;
   postsPerPage = 2;
   currentPage = 1;
   pageSizeOptions = [1, 2, 5, 10];
   userIsAuthenticated = false;
   userId!: string;
   private postsSub!: Subscription;
   private authStatusSub!: Subscription;

   constructor(public postsService: PostsService, private authService: AuthService, private cdr: ChangeDetectorRef) {}

    ngOnInit() {
        this.isLoading = true;
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
        this.userId = this.authService.getUserId();
        this.postsSub = this.postsService.getPostUpdateListener().subscribe((postData: {posts: Post[], postCount: number }) => {
            this.isLoading = false;
            this.totalPosts = postData.postCount;
            this.posts = postData.posts;
            this.cdr.detectChanges();
        });
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
            this.userIsAuthenticated = isAuthenticated;
            this.userId = this.authService.getUserId();
        });
    }

    onChangedPage(pageData: PageEvent) {
        this.isLoading = true;
        this.currentPage = pageData.pageIndex + 1;
        this.postsPerPage = pageData.pageSize;
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
    }

    onDelete(postId: string) {
        this.isLoading = true;
        this.postsService.deletePost(postId).subscribe(() => {
            this.postsService.getPosts(this.postsPerPage, this.currentPage);
        }, () => {
            this.isLoading = false;
        });
    }

    ngOnDestroy() {
        this.postsSub.unsubscribe();
        this.authStatusSub.unsubscribe();
    }
}
