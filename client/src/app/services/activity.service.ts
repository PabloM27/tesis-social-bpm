import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';


@Injectable()
export class ActivityService {
	public url: string;
	public identity;
	public token;
	public stats;

	constructor(public _http: HttpClient) {
		this.url = GLOBAL.url;
	}

	/**
	 * Lee los contadores de hashtags de una actividad
	 * dado id de actividad
	 * @param idActivity 
	 */
	getActivityHashtagsCounters(idActivity): Observable<any> {
		//console.log("leer contadores de actividad" + idActivity);
		//http://localhost:3800/api/comment/5ca3e1bb77fb7f13f85a1091
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		let result = this._http.get(this.url + 'activity/'+idActivity+'/counters', { headers: headers });
		return result;
	}

	/**
	 * Lee todos los comentarios de 
	 * determinada actividad que contentan 
	 * determinado hashtag
	 * @param p 
	 */
	getActivityCommentsByHashtag(p): Observable<any> {
		let idActivityBPM = p.idActivityBPM
		let hashtag = p.hashtag;
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		let result = this._http.get(this.url + 'activity/'+idActivityBPM+'/activitie-comments/'+hashtag, { headers: headers });
		return result;
	}

}