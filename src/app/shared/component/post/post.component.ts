import { Component, Inject, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../service/posts.service';
import { Iposts } from '../../model/posts';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  postId ! : string;
  postObj ! : Iposts
private _postService = inject(PostsService);
arrcatg : Array<string> = ["javascript","html","code","angularjs"]

  constructor( private _route :ActivatedRoute ,
              private _router: Router
               
                ) { }

  ngOnInit(): void {
  this.postId =  this._route.snapshot.params["postId"]      // snapshot =  (obj) // params = (obsvable)
    this._postService.fetchpost(this.postId)
    .subscribe(obj =>{
      console.log(obj);
      this.postObj = {...obj,id : this.postId}
    })
  }

get getcatg(){
    return this.arrcatg[Math.floor(Math.random() *4)]
  }
  onpostDelete(){
 let getConfirm = confirm(`Are you sure, you want to remove this.post`);
 if(getConfirm){
  this._postService.deletepost(this.postId)
  .subscribe(res =>{
    console.log(res);
    this._router.navigate(['/home'])
  })
 }
  }
}
