import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';


@Injectable()
export class ActivitycommentService {
	public url: string;
	public identity;
	public token;
	public stats;

	constructor(public _http: HttpClient) {
		this.url = GLOBAL.url;
	}

	getActivityComments(idProcess, idActivity): Observable<any> {
		console.log("entro a service" + idProcess+idActivity);
		//http://localhost:3800/api/comment/5ca3e1bb77fb7f13f85a1091
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.get(this.url + 'activitycomments/' + idProcess +"/"+idActivity, { headers: headers });
	}

	addActivityComment(pComment): Observable<any> {
				let params = JSON.stringify(pComment);

				//http://localhost:3800/api/comment/5ca3e1bb77fb7f13f85a1091
				let headers = new HttpHeaders().set('Content-Type', 'application/json');
				return this._http.post(this.url + 'activitycomment', params,{ headers: headers });
	}

}