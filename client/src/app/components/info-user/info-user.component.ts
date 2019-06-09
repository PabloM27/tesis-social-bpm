import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import {GLOBAL} from '../../services/global';
import {Router,ActivatedRoute,Params} from '@angular/router';
import{UserService} from '../../services/user.service';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.css'],
  providers: [UserService]
})
export class InfoUserComponent implements OnInit {
  @Input() user: User;
  private title: String;
  private identity: String;
  private token: String;
  private url: String;
  private image: String = "../../../assets/user-image.png";

  constructor(
    private _userService:UserService,
	){
		this.title='Usuario'; 
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
	}

  ngOnInit() {
    this.loadImage();
  }

  loadImage(){
    if(this.user && this.user.image){
      this.image = this.user.image;
    }
  }

}
