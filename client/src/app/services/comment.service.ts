import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Comment} from '../models/comment';
import {GLOBAL} from './global';

//indicamos que va a ser injectado en otra clase, el ser injectable 
//significa que puede ser parametrizada en el constructor de otra clase
@Injectable()
export class CommentService{
	public url:string;
	public identity;
	public token;
	public stats;

	constructor(public _http: HttpClient){
		this.url  = GLOBAL.url;
	}

	getComment(id):Observable<any>{
        //http://localhost:3800/api/comment/5ca3e1bb77fb7f13f85a1091
        let headers =  new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'comment/'+id,{headers:headers});
	}
	
    
}