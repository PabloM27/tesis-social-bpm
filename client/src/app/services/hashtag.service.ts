import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';


@Injectable()
export class HashtagService {
	public url: string;
	public identity;
	public token;
	public stats;

	constructor(public _http: HttpClient) {
		this.url = GLOBAL.url;
    }
    
    getHashtags():Observable<any>{

		//http://localhost:3800/api/process/5c7d78dda22f2a0f14fc2a2c
			let headers =  new HttpHeaders().set('Content-Type','application/json');
			return this._http.get(this.url+'hashtags',{headers:headers});
		

    }
}