import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { Http, Response } from '@angular/http';
import { Details } from '../../../details';
import {HttpClientModule} from '@angular/common/http';
import {Settings} from '../../../settings';
import {environment} from '../../../../environments/environment';


@Injectable()
export class WebService {
	private url:string;
  public setUrl(url){
    this.url = url;
  }

  constructor(private http: Http) {

     }

  getPosts(): Observable<Details[]>{
  	return this.http.get(this.url).map((response: Response) => {
  		return <Details[]>response.json();
  	})
  }

  getName(){
    return this.http.get(this.url).map(res => {
      return res;
    })
  }

  sendPosts(settings){
     return this.http.post(environment.send_url, settings).subscribe(data=>{console.log(data)});
   }
}
