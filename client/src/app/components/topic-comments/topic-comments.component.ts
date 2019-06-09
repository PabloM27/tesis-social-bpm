import { Component, OnInit, Input,ViewEncapsulation,ElementRef , ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Topic } from '../../models/topic';
import { UserService } from '../../services/user.service';
import { ProcessService } from '../../services/process.service';
import { TopicService } from '../../services/topic.service';
import { CommentService } from '../../services/comment.service';
import { GLOBAL } from '../../services/global';
import { Comment } from '../../models/comment';
import { User } from '../../models/user';
import { MatInput } from '@angular/material';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-topic-comments',
  templateUrl: './topic-comments.component.html',
  styleUrls: ['../../../styles.css','./topic-comments.component.css'],
  providers: [UserService, TopicService, CommentService],
 
})
export class TopicCommentsComponent implements OnInit {

  @Input() topic_selected_id: string = '';
  public identity;
  public token;
  public title;
  public url;
  public topic: Topic;
  public selectedTopic: Topic;
  public comments;
  //@ViewChild('comment_', {read: ElementRef}) private comment_: ElementRef;
  //@ViewChild('comment_') inputComment:ElementRef ;

  //@ViewChild('comment_') input: MatInput;


  constructor(
    private _userService: UserService,
    private _commentService: CommentService,
    private _topicService: TopicService
  ) {
    this.title = 'Topico y sus comentarios';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log("topicComments.component ha sido cargadooo");
    console.log("llego el id del topico a cargar" + this.topic_selected_id);
    this.loadSession();
    this.loadTopicSelected();

    //to do leer el topico y mostar componente del topic y el listado 
    //de sus comentarios
    //puede leer el topico populado, puede mostrar todos los msj en el componenete
    //esto requiere que el componenete comentario pueda recibir en vez de un id el modelo del comment
    //puedo leer el tipico con solo id y leer varias veces el msj
  }

  loadTopicSelected() {
    if (this.topic_selected_id) {
      this._topicService.getTopic(this.topic_selected_id).subscribe(
        response => {
          if (response.topic) {
            console.log("el topico leido en el componenet");
            console.log(response.topic);
            this.topic = response.topic;
          }
        },
        error => {
          console.log(<any>error);

        }
      )

      this._commentService.getComments(this.topic_selected_id).subscribe(
        response => {
          if (response.comments) {
            console.log("los mensajes del topico leidos");
            console.log(response.comments);
            this.comments = response.comments;
          }
        },
        error => {
          console.log(<any>error);

        }
      )
    }

  }
  addComment(textComment: string) {
    console.log("llegue"+textComment);
    //alert(this.input.value);
    var xComment = new Comment('', textComment, this.identity._id,this.topic_selected_id, '');
    console.log(xComment);
    this._commentService.createComment(xComment).subscribe(
      response => {
        console.log(response.comment);
        if (response.comment) {
          console.log("comentario creado 1");
          console.log(response.comment);
          console.log("comentario creado 2 ");
          this.comments.push(response.comment);
          console.log("comentario creado 3 ");
          //alert(this.input.value);
          //this.inputComment.nativeElement.value = "";
          // agregarlo a la lista
        }else{
          //error
          console.log("errorrr");
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
}
