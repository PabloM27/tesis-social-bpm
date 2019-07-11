import { Component, OnInit,Input } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {User} from '../../models/user';
import {Comment} from '../../models/comment';
import{UserService} from '../../services/user.service';
import{CommentService} from '../../services/comment.service';
import {GLOBAL} from '../../services/global';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  providers:[UserService,CommentService]
})
export class CommentComponent implements OnInit {


	@Input() comment_object: Comment;

  public user:User;
	public title:string;
	public identity;
	public token;
	public status:string;
  public url;
	public comment:Comment;

  constructor(
		
		private _router: Router,
    private _userService:UserService,
    private _commentService:CommentService,
	){
		this.title='Comentario'; 
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
	}
  ngOnInit(){
		console.log("comment.componenet ha sido cargado");
		this.loadCommentData();	
  }
  
  loadCommentData(){			
		this.comment = this.comment_object;
	//	this._route.params.subscribe(params =>{
		/*var idComment = params['idcomment'];
		console.log("parametros")
		console.log(params);	
		console.log("el ide es"+idComment);*/
		
		/*	if (this.comment_id) {
				this._commentService.getComment(this.comment_id).subscribe(
					response => {
						if (response.comment) {
							console.log("comentario leido es");
							console.log(response.comment);
							this.comment = response.comment;
						} else {
							this.status = 'error';
						}
					},
					error => {
						console.log(<any>error);
						this._router.navigate(['/']);
					}
				)
			}*/
	//	})
	}
}





	

