import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';
import {GLOBAL} from './global';

//indicamos que va a ser injectado en otra clase, el ser injectable 
//significa que puede ser parametrizada en el constructor de otra clase
@Injectable()
export class UserService{
	public url:string;
	public identity;
	public token;
	public stats;

	constructor(public _http: HttpClient){
		this.url  = GLOBAL.url;
	}

	register(user_to_register): Observable <any>{
		//console.log('se registra el usuario');
		console.log(user_to_register)
		console.log(this.url);
		let params = JSON.stringify(user_to_register);
		let headers = new HttpHeaders().set('Content-Type','application/json');
		return this._http.post(this.url+'register',params,{headers:headers});
	}

	/*Metodo de login*/
	signup(user, gettoken = null): Observable<any>{
		if(gettoken != null){
			user.gettoken = gettoken;
		}

		let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type','application/json');
		console.log("login a ");
		console.log(this.url+'login');
		console.log(params);
		return this._http.post(this.url+'login',params,{headers:headers});
	}

	getIdentity(){
		let identity = JSON.parse(localStorage.getItem('identity'));
		if(identity!="undefine"){
			this.identity = identity;
		}else{
			this.identity=null;
		}
		return this.identity;
	}

	getToken(){
		let token = localStorage.getItem('token');
		if(token!="undefine"){
			this.token = token;
		}else{
			this.token=null;
		}
		return this.token;
	}

	//ojo que cuando sigo a alguien no esta refrescando el localStorage
	getStats(){
		let stats = JSON.parse(localStorage.getItem('stats'));
		if(stats !='undefined'){
			this.stats  = stats;
		}else{
			this.stats = null;
		}
		return stats;	
	}


	getCounters(userId = null):Observable<any>{
		console.log("llama a contadores");
		let headers =  new HttpHeaders().set('Content-Type','application/json').set("Authorization",this.getToken());
		if(userId!=null){
			return this._http.get(this.url+'counters/'+userId,{headers:headers})
		}else{
			return this._http.get(this.url+'counters',{headers:headers})
		}
	}

	updateUser(user: User):Observable<any>{
		let paramas =  JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type','application/json').set("Authorization",this.getToken());
		return this._http.put(this.url+'update-user/'+user._id,paramas,{headers:headers});
	}

	/*Lee a todos los usuarios */
	getAllUsers():Observable<any>{
		let headers =  new HttpHeaders().set('Content-Type','application/json').set('Authorization',this.getToken());
		return this._http.get(this.url+'users-all/',{headers:headers});
	}

	/*Lee a todos los por nro de pagina */
	getUsers(page = null):Observable<any>{
		let headers =  new HttpHeaders().set('Content-Type','application/json').set('Authorization',this.getToken());
		return this._http.get(this.url+'users/'+page,{headers:headers});
	}

	getUser(id):Observable<any>{
		console.log("llamara a get User");
		let headers =  new HttpHeaders().set('Content-Type','application/json').set('Authorization',this.getToken());
		var ruta = this.url+'user/'+id;
		console.log(ruta);
		console.log(this.getToken());
		return this._http.get(this.url+'user/'+id,{headers:headers});
	}


}