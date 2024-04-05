import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../service/posts.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Iposts } from '../../model/posts';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  postform!: FormGroup;
  isIneditode: boolean = false;
  postId !: string
  constructor(private _postserives: PostsService,
              private _router: ActivatedRoute,
              private _router1 : Router  ) { }

  ngOnInit(): void {
    this.creatpost();
    this.postId = this._router.snapshot.params['postId']
    if(this.postId){
      this.isIneditode = true;
      this._postserives.fetchpost(this.postId) 
          .subscribe(res =>{
            console.log(res);
            this.postform.patchValue(res)
          })
    }

  }
  creatpost() {
    this.postform = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      body: new FormControl(null, [Validators.required]),
      userId: new FormControl(null, [Validators.required])
    })


  }
  onsubmit() {
    if (this.postform.valid) {
      let post = this.postform.value;
      console.log(post);
      this.postform.reset() // obj
      this._postserives.createnewpost(post) // return Observable
        .subscribe(res => {
          console.log(res);

        })
    }
  }
  onpostUpdate(){
    if(this.postform.valid){
      let updateobj : Iposts =this.postform.value;
      console.log(updateobj);
        this._postserives.updatepost(updateobj,this.postId)
        .subscribe(res => {
          console.log(res)
          this._router1.navigate(['/home'])
        }
         
        )
    }
  }

}///////