import {  Component, AfterViewInit, ElementRef, ViewChild,OnInit ,Renderer2 } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { ActivitycommentService } from '../../services/activitycomment.service';
import { ActivityComment } from 'src/app/models/activityComment';
import { HashtagService } from '../../services/hashtag.service';

@Component({
  selector: 'app-activitycomments',
  templateUrl: './activitycomments.component.html',
  styleUrls: ['../../../styles.css', './activitycomment.component.css'],
  providers: [UserService, ActivitycommentService, HashtagService]
})
export class ActivitycommentsComponent implements AfterViewInit  {
  public idProcess: string = '5c91928d2f09871f0413654e';
  public idActivity: string = '5c91928d2f09871f0413654e';

  // @ViewChild('comment_') inputComment: ElementRef;
  public title;
  public identity;
  public token;
  public url;
  public comments = [];
  public commentText;
  public commentTextForView: string;
  public textCopy;
  public spanPosition;

  public bottomTag;
  public leftTag;
  public showTag = false;
  public hashtags;

  @ViewChild("spanPosition",{static: false}) elementPosition: ElementRef;
  @ViewChild("dropTag",{static: false}) dropTag: ElementRef;
  @ViewChild("textareaComment",{static: false}) textareaComment: ElementRef;
  @ViewChild("modalcomments",{static: false}) modalcomments: ElementRef;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _activitycommentService: ActivitycommentService,
    private _hashtagService: HashtagService,
    private renderer: Renderer2
  ) {
    this.title = 'Comentarios de Actividad';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }
  ngAfterViewInit() {
    

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
    );

    this._hashtagService.getHashtags().subscribe(
      response => {
        console.log("hasshhh");
        console.log(response.hashtags);
        if (response.hashtags) {
          this.hashtags = response.hashtags;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
    
  }

  addComment() {

    if (this.validateComment()) {

      //analizar texto y crear hashtags
      var hashtagsArray =this.getHashTags(this.commentText);
     
      var xActCom = new ActivityComment('', this.commentText, hashtagsArray,this.idProcess,'',this.idActivity, '', '', this.identity._id, '');
      this._activitycommentService.addActivityComment(xActCom).subscribe(
        response => {
          if (response.activitycomment) {
            response.activitycomment.emitter = this._userService.getIdentity();
            console.log(response.activitycomment);
            // agregarlo a la lista
            this.comments.push(response.activitycomment);
            this.commentText = "";
            // posicion de scroll
            setTimeout(()=>{ this.modalcomments.nativeElement.scrollTop = 99999999; },1)
            ;
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


   getHashTags(inputText) {  
    var regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
    var matches = [];
    var match;

    while ((match = regex.exec(inputText))) {
        matches.push(match[1]);
    }

    return matches;
}


  keyText(pcommentText,event){
    var xTexto = event.target.value;//event.originalTarget.value;
    var lastChar = pcommentText[event.target.selectionEnd-1];
    this.textCopy = xTexto.substring(0,event.target.selectionEnd-1).replace(/\r?\n/g, '<br>');
    //console.log(this.elementPosition);
    //console.log(event);
    this.showTag = false;
    if(lastChar == "#"){
      this.leftTag = this.elementPosition.nativeElement.offsetLeft;
      if(event.target.scrollTop == 0){
        this.bottomTag = 90 ;
      }else{
        this.bottomTag = 80 ;
      }
      
      this.showTag = true;
    }else {
      this.showTag = false;
    }

  }

  setTag(pHashtag){
    var textAnt = this.textareaComment.nativeElement.value.substring(0,this.textareaComment.nativeElement.selectionEnd);
    var textDesp = this.textareaComment.nativeElement.value.substring(this.textareaComment.nativeElement.selectionEnd,this.textareaComment.nativeElement.textLength);
    this.commentText = textAnt+pHashtag+" "+textDesp;
    this.showTag = false;
  }

  findChoices(searchText: string) {
    return ['John', 'Jane', 'Jonny'].filter(item =>
      item.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  getChoiceLabel(choice: string) {
    return `#${choice} `;
  }
}
