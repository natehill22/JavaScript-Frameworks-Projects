import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { CommonModule } from "@angular/common";
import { MatExpansionModule } from "@angular/material/expansion";

import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.html',
    imports: [CommonModule, MatExpansionModule, MatButtonModule, RouterLink, MatProgressSpinner],
    styleUrls: ['./post-list.css']
})

export class PostListComponent implements OnInit, OnDestroy {

   posts: Post[] = [];
   isLoading = false;
   private postsSub!: Subscription;

   constructor(public postsService: PostsService, private cdr: ChangeDetectorRef) {}

    ngOnInit() {
        this.isLoading = true;
        this.postsService.getPosts();
        this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
            this.isLoading = false;
            this.posts = posts;
            this.cdr.detectChanges();
        });
    }

    onDelete(postId: string) {
        this.postsService.deletePost(postId);
    }

    ngOnDestroy() {
        this.postsSub.unsubscribe();
    }
}
