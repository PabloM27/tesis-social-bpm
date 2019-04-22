import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ActivityExecutor} from '../models/activityExecutor';
import {GLOBAL} from './global';

//indicamos que va a ser injectado en otra clase, el ser injectable 
//significa que puede ser parametrizada en el constructor de otra clase
@Injectable()
export class WorkflowService{
	public url:string;
	public identity;
	public token;
	public stats;

	constructor(public _http: HttpClient){
		this.url  = GLOBAL.url;
	}

	getActivityExecutor(activityExecutor:ActivityExecutor):Observable<any>{
        //http://localhost:4200/execution-selector/process:4:12524/4/sid-E71ADFC4-FA0D-4E42-A64A-51B62F1E22F4/15028
		let headers =  new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+
            'workflow-executor/'+activityExecutor.idProcessBPM+"/"+activityExecutor.processVersion+'/'+
            activityExecutor.idActivityBPM+'/'+activityExecutor.idCase,{headers:headers});
    }
    
    createActivityExecutor(activityExecutor:ActivityExecutor):Observable<any>{
        //http://localhost:3800/api/workflow-executor/
        let params = JSON.stringify(activityExecutor);
        let headers =  new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'/workflow-executor',params,{headers:headers});
    }

    updateActivityExecutor(activityExecutor:ActivityExecutor):Observable<any>{
        //http://localhost:3800/api/workflow-executor/
        let params = JSON.stringify(activityExecutor);
        let headers =  new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'/workflow-executor-update',params,{headers:headers});
    }
   
    
}