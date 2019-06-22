import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { ActivitycommentService } from '../../services/activitycomment.service';
import { ActivityComment } from 'src/app/models/activityComment';
@Component({
  selector: 'app-activitycomment',
  templateUrl: './activitycomment.component.html',
  styleUrls: ['../../../styles.css', './activitycomment.component.css'],
  providers: [UserService, ActivitycommentService]
})
export class ActivitycommentComponent implements OnInit {
  public idProcess: string = '5c91928d2f09871f0413654e';
  public idActivity: string = '5c91928d2f09871f0413654e';

  // @ViewChild('comment_') inputComment: ElementRef;
  public title;
  public identity;
  public token;
  public url;
  public comments = [];
  public commentText: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _activitycommentService: ActivitycommentService,
  ) {
    this.title = 'Comentarios de Actividad';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.commentText;
  }
  ngOnInit() {


    console.log("activitycomment.componenet ha sido cargadooo");

    this._route.params.subscribe(params => {
      this.idProcess = params['idProcessBPM'];
      this.idActivity = params['idActivityBPM'];

      console.log("llego process" + this.idProcess);
      console.log("llego act" + this.idActivity);
      this.loadCommentData();

    })


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

  addComment() {




    if (this.validateComment()) {
      var xActCom = new ActivityComment('', this.commentText, null,this.idProcess,'',this.idActivity, '', '', this.identity._id, '');
      this._activitycommentService.addActivityComment(xActCom).subscribe(
        response => {
          if (response.activitycomment) {
            response.activitycomment.emitter = this._userService.getIdentity();
            console.log(response.activitycomment);
            // agregarlo a la lista
            this.comments.push(response.activitycomment);
            this.commentText = "";

          } else {
            console.log("error creando comentario");
          }
        },
        error => {
          var errorMessage = <any>error;
          console.log(errorMessage);
        }
      )
    }
  }

  validateComment() {
    return (this.commentText != '');
  }
}
