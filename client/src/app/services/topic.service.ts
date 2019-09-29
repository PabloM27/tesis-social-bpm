import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Topic} from '../models/Topic';
import {GLOBAL} from './global';
import {UserService} from '../services/user.service';

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
		this.token = UserService.getToken();
	}


	getTopic(id):Observable<any>{

    //http://localhost:3800/api/process/5c7d78dda22f2a0f14fc2a2c
		let headers =  new HttpHeaders().set('Content-Type','application/json').set('Authorization',UserService.getToken());
		return this._http.get(this.url+'topic/'+id,{headers:headers});
	}

	getTopicFull(id):Observable<any>{

    //http://localhost:3800/api/process/5c7d78dda22f2a0f14fc2a2c
		let headers =  new HttpHeaders().set('Content-Type','application/json').set('Authorization',UserService.getToken());
		return this._http.get(this.url+'topic/'+id,{headers:headers});
	}

	createTopic(topic):Observable<any>{
		let params = JSON.stringify(topic);

		let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',UserService.getToken());
		return this._http.post(this.url + 'topic', params, { headers: headers });
	}
	
	getTopics(idProcess):Observable<any>{

		//http://localhost:3800/api/process/5c7d78dda22f2a0f14fc2a2c
		let headers =  new HttpHeaders().set('Content-Type','application/json').set('Authorization',UserService.getToken());
		return this._http.get(this.url+'topics/'+idProcess,{headers:headers});
	}


    
}