import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { CommonModule } from "@angular/common";
import { MatExpansionModule } from "@angular/material/expansion";

import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.html',
    imports: [CommonModule, MatExpansionModule, MatButtonModule],
    styleUrls: ['./post-list.css']
})

export class PostListComponent implements OnInit, OnDestroy {

   posts: Post[] = [];
   private postsSub!: Subscription;

   constructor(public postsService: PostsService, private cdr: ChangeDetectorRef) {}

    ngOnInit() {
        this.postsService.getPosts();
        this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
            this.posts = posts;
            this.cdr.detectChanges();
        });
    }

    ngOnDestroy() {
        this.postsSub.unsubscribe();
    }
}
