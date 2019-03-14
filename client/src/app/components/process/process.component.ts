import {Component,OnInit} from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {User} from '../../models/user';
import {Process} from '../../models/process';
import{UserService} from '../../services/user.service';
import{ProcessService} from '../../services/process.service';
import {GLOBAL} from '../../services/global';

@Component({
	selector: 'process',
	templateUrl:'./process.component.html',
	providers:[UserService,ProcessService]
})

export class ProcessComponent implements OnInit{
	public user:User;
	public title:string;
	public identity;
	public token;
	public status:string;
    public url;
    public process:Process;
	
	constructor(
		private _route:ActivatedRoute,
		private _router: Router,
        private _userService:UserService,
        private _processService:ProcessService,
	){
		this.title='Proceso'; 
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
	}

	ngOnInit(){
		console.log("process.component ha sido cargadooo");
		this.loadProcessData();	
	}

	loadProcessData(){	
		this.getProcess();	
	}

	getProcess(){
		this._processService.getProcess("5c7d78dda22f2a0f14fc2a2c").subscribe(
			response =>{
				if(response.process){
                    console.log("el proceso leido es");
                    console.log(response.process);
					this.process = response.process;
				}else{
					this.status = 'error';
				}
			},
			error =>{
				console.log(<any>error);
				this._router.navigate(['/']);
			}
		)

	}
}