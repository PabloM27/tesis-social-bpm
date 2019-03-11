import { Component,OnInit,DoCheck } from '@angular/core';
import {Router, ActivatedRoute, Params}from '@angular/router';
//cargo el servicio de usuario
import {UserService} from './services/user.service';
import {GLOBAL} from './services/global';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  public title:string;
  public identity;
  public url:string;

  constructor(
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _userService: UserService
  	){
  	this.title = 'app social';
  	this.url = GLOBAL.url;
  }


  ngOnInit(){
  	this.identity = this._userService.getIdentity();
  	//la identidad cacheada es 
  	console.log(this.identity)
  }

  //cada vez que se produce un cambio en la app se ejecuta este evento
  //para que esto funcione se tuvo que implementar la interface OnInit, DoCheck
  ngDoCheck(){
  	this.identity = this._userService.getIdentity();
  }

  logout(){
  	localStorage.clear();
  	this.identity = null;
  	this._router.navigate(['/']);
  }	
}

