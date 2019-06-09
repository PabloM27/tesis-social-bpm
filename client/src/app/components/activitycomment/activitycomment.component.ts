import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { ActivitycommentService } from '../../services/activitycomment.service';
import { ActivityComment } from 'src/app/models/activityComment';
@Component({
  selector: 'app-activitycomment',
  templateUrl: './activitycomment.component.html',
  styleUrls: ['../../../styles.css','./activitycomment.component.css'],
  providers: [UserService, ActivitycommentService]
})
export class ActivitycommentComponent implements OnInit {
  public idProcess: string = '5c91928d2f09871f0413654e';
  public idActivity: string = '5c91928d2f09871f0413654e';
  
  @ViewChild('comment_') inputComment: ElementRef;
  public title;
  public identity;
  public token;
  public url;
  public comments = [];

  constructor(
    private _router: Router,
    private _userService: UserService,
    private _activitycommentService: ActivitycommentService,
  ) {
    this.title = 'Comentarios de Actividad';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }
  ngOnInit() {
    console.log("activitycomment.componenet ha sido cargadooo");
    console.log("llego process" + this.idProcess);
    console.log("llego act" + this.idActivity);
    this.loadSession();
    this.loadCommentData();
  }

  loadCommentData() {
    console.log("inicio");
    this._activitycommentService.getActivityComments(this.idProcess, this.idActivity).subscribe(
      response => {
        console.log("entreeee")
        if (response.activitycomments) {
          console.log("los comentarios fueron cargados");
          console.log(response.activitycomments);
          this.comments = response.activitycomments;
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  addComment(text) {
    var xActCom = new ActivityComment('', text, null, this.idProcess, this.idActivity, this.identity._id, '');
    this._activitycommentService.addActivityComment(xActCom).subscribe(
      response => {
        if (response.activitycomment) {
          response.activitycomment.emitter = this._userService.getIdentity();
          console.log(response.activitycomment);
          this.comments.push(response.activitycomment);
          this.inputComment.nativeElement.value = "";
          // agregarlo a la lista
        } else {
          //error
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        /*if (errorMessage != null) {
          this.status = 'error';
        }*/
      }
    )
  }

  loadSession() {
    //logear al usuario y conseguir sus datos
    //console.log(this.user);
    /*
    public _id: string,
		public name:string,
		public surname:string,
		public nick:string,
		public email:string,
		public password:string,
		public role:string,
		public image:string,
		public created_at:string,
    */
    let user: User;
    user = new User("", "", "", "", "admin@gmail.com", "demo", "", "", "");

    this._userService.signup(user).subscribe(
      response => {
        console.log('usuario logeado con exito');
        this.identity = response.readUser;
        if (!this.identity || !this.identity._id) {
          //this.status = 'error';
          // desahabilitar boton
          alert("error");
        } else {

          //persistir datos del usuario
          localStorage.setItem('identity', JSON.stringify(this.identity));

          //conseguir el token
          //this.getToken();
        }


      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          //	this.status = 'error';
          alert("error");
        }
      })
  }
/*
  getToken() {

    this._userService.signup(this.user, 'true').subscribe(
      response => {

        this.token = response.token;
        console.log('el token recuperado es' + this.token);
        if (this.token.length <= 0) {
          this.status = 'error';
        } else {

          //persistir token del usuario
          localStorage.setItem('token', this.token);

          //conseguir las estadisticas del usr
          this.getCounters();


        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      })

  }*/
}
