import {Component,OnInit} from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
	selector:'login',
	templateUrl:'./login.component.html',
	providers:[UserService]
})

export class LoginComponent implements OnInit{

	public title:string;
	public user: User;
	public status:string;
	public identity;
	public token;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
	){
		this.title="Identificate";
		//this.user = new User("","juan","perez","juancho","pablo@gmail.com","","","gettoken");
		this.user = new User("","","","","","","ROLE_USER","","");
	}
	ngOnInit(){
		console.log('componente login cargado');
	}

	onSubmit(){
		this._userService.signup(this.user).subscribe(
			response=>{
				this.identity = response.readUser;
				if(!this.identity || !this.identity._id ){
					this.status = 'error';
				}else{
					//pera persistir datos del usuario en localStorage falta conseguir el token
					this.getToken();
				}
			},
			error =>{
				var errorMessage =<any>error;
				console.log(errorMessage);
				if(errorMessage!=null){
					this.status = 'error';
				}
			})
	}

	

	getToken(){

		this._userService.signup(this.user,'true').subscribe(
			response=>{
				
				this.token = response.token;
				console.log('el token recuperado es'+this.token);
				if(this.token.length <= 0){
					this.status = 'error';
				}else{
					//si no persisto los datos del user y el token en simultaneo 
					//puedo tener problemas por falta se sincronizacion , al estar identity y no el token
					//persistir datos del usuario				
					localStorage.setItem('identity',JSON.stringify(this.identity));
					//persistir token del usuario
					console.log("se guarda el token del usuer"+this.token)
					localStorage.setItem('token',this.token);
					//conseguir las estadisticas del usr
					//this.getCounters();
					//recien cuando ejecuto esto , el componente pasa a estado success
					localStorage.setItem('stats',JSON.stringify(response));
					this.status = 'success'
					this._router.navigate(['/']);
							
				}
			},
			error =>{
				var errorMessage =<any>error;
				console.log(errorMessage);
				if(errorMessage!=null){
					this.status = 'error';
				}
			})

	}

	getCounters(){
		this._userService.getCounters().subscribe(
			response =>{
				localStorage.setItem('stats',JSON.stringify(response));
				//recien cuando ejecuto esto , el componente pasa a estado succes
				this.status = 'success'
				this._router.navigate(['/']);
			},
			error =>{
				console.log(<any>error);
			}

		);
	}
}