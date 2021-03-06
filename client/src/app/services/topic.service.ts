import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Topic} from '../models/Topic';
import {GLOBAL} from './global';

//indicamos que va a ser injectado en otra clase, el ser injectable 
//significa que puede ser parametrizada en el constructor de otra clase
@Injectable()
export class TopicService{
	public url:string;
	public identity;
	public token;
	public stats;

	constructor(public _http: HttpClient){
		this.url  = GLOBAL.url;
	}

	getTopic(id):Observable<any>{

    //http://localhost:3800/api/process/5c7d78dda22f2a0f14fc2a2c
		let headers =  new HttpHeaders().set('Content-Type','application/json');
		return this._http.get(this.url+'topic/'+id,{headers:headers});
	}

	getTopicFull(id):Observable<any>{

    //http://localhost:3800/api/process/5c7d78dda22f2a0f14fc2a2c
		let headers =  new HttpHeaders().set('Content-Type','application/json');
		return this._http.get(this.url+'topic/'+id,{headers:headers});
	}

	
	
    
}