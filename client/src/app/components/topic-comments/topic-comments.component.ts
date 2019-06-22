import { Component, OnInit, Input, ViewEncapsulation, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Topic } from '../../models/topic';
import { UserService } from '../../services/user.service';
import { ProcessService } from '../../services/process.service';
import { TopicService } from '../../services/topic.service';
import { CommentService } from '../../services/comment.service';
import { GLOBAL } from '../../services/global';
import { Comment } from '../../models/comment';
import { User } from '../../models/user';

@Component({
  selector: 'app-topic-comments',
  templateUrl: './topic-comments.component.html',
  styleUrls: ['../../../styles.css', './topic-comments.component.css'],
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
  public newTextComment;

  


  constructor(
    private _userService: UserService,
    private _commentService: CommentService,
    private _topicService: TopicService
  ) {
    this.title = 'Topico y sus comentarios';
    this.newTextComment = '';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log("topicComments.component ha sido cargadooo");
    console.log("llego el id del topico a cargar" + this.topic_selected_id);
    this.loadTopicSelected();
  }

  loadTopicSelected() {
    if (this.topic_selected_id) {
      this._topicService.getTopic(this.topic_selected_id).subscribe(
        response => {
          if (response.topic) {
            console.log("el topico leido en el component");
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
            console.log("los comentarios del topico leidos");
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
  addComment() {
    console.log("llegue");
    console.log(this.newTextComment);
    //alert(this.input.value);

    if (this.validateComment(this.newTextComment)) {
      var xComment = new Comment('', this.newTextComment, this.identity._id, this.topic_selected_id, '');
      this._commentService.createComment(xComment).subscribe(
        response => {
          //console.log(response.comment);
          if (response.comment) {
            //console.log(response.comment);
            this.comments.push(response.comment);
            //console.log("comentario creado 3 ");
            //alert(this.input.value);
            this.newTextComment = "";
            // agregarlo a la lista
           
          } else {
            //error
            console.log("errorrr");
          }
        },
        error => {
          var errorMessage = <any>error;
          console.log(errorMessage);
        }
      )
    }else{
      console.log("invalid comment");
    }


  }

  validateComment(commentText) {
    return (commentText != '');
  }
}
