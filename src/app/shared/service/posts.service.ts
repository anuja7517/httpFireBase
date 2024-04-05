import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Iposts } from '../model/posts';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  postUrl : string = `${environment.baseUrl}/posts.json`
  constructor(private _http : HttpClient) { }

  createnewpost(post : Iposts): Observable<any>{// database obj  
   return this._http.post(this.postUrl,post)// 2 arrument,=> 1) url & 2) obj send 
  }
  fetchAllpost():Observable <any>{
    return this._http.get(this.postUrl) 
      .pipe(
        tap(res=> console.log(res)),
           map((res :any) =>{
            let postArr : Array<Iposts>= [];
            for (const key in res) {
              postArr.push({... res[key],id : key})
            }
            return postArr;
          
        })
      )
  }
    fetchpost(id:string):Observable <any>{
      let header = new HttpHeaders()
            // .set('Content-type','application/json')
            // .set('authtest','Bearer JWT')

    let singleposturl = `${environment.baseUrl}/posts/${id}.json`;
     return this._http.get(singleposturl)
     // headers : header   // login : token // header : (imp)  authtest
     
  }

  updatepost(updateobj :Iposts, updateId : string): Observable<any>{
    let updatedUrl = `${environment.baseUrl}/posts/${updateId}.json`
    return this._http.patch(updatedUrl,updateobj)
  }

  deletepost(deleteId : string): Observable<any>{
    let deletUrl = `${environment.baseUrl}/posts/${deleteId}.json`
   return this._http.delete(deletUrl)
  }

}
