import { Component, OnInit } from '@angular/core';
import { Iposts } from '../../model/posts';
import { PostsService } from '../../service/posts.service';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {
  allposts !: Array<Iposts>
  constructor(private _postservice: PostsService) { }

  ngOnInit(): void {
    this._postservice.fetchAllpost()
      .subscribe((res: Array<Iposts>) => {
        console.log(res);
        this.allposts = res;


        // let arr = [];
        // for (const key in res) {
        //   let obj = res [key];
        //   arr.push(obj)
        // }
        // console.log(arr); //( this. dialog .open()
        

      })
  }

}
