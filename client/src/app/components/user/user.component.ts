import {Component,OnInit} from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {User} from '../../models/user';
import{UserService} from '../../services/user.service';
import {GLOBAL} from '../../services/global';

@Component({
	selector: 'user',
	templateUrl:'./user.component.html',
	providers:[UserService]
})

export class UserComponent implements OnInit{
	public user:User;
	public title:string;
	public identity;
	public token;
	public status:string;
	public url;
	
	constructor(
		private _route:ActivatedRoute,
		private _router: Router,
		private _userService:UserService,
	){
		this.title='Usuario'; 
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
	}

	ngOnInit(){
		console.log("user.component ha sido cargadooo");
		this.loadUserInfo();	
	}

	loadUserInfo(){	
		this.getUser();	
	}

	getUser(){
		this._userService.getUser(this.identity._id).subscribe(
			response =>{
				if(response.user){
					this.user = response.user;
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