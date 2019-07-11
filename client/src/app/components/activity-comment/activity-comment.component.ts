import { Component, OnInit,Input } from '@angular/core';


import { ActivityComment } from 'src/app/models/activityComment';

@Component({
  selector: 'app-activity-comment',
  templateUrl: './activity-comment.component.html',
  styleUrls: ['./activity-comment.component.css']
})
export class ActivityCommentComponent implements OnInit {

  @Input() activitycomment_object: ActivityComment;
  public activityComment : ActivityComment;
  public commentTextForView: string;

  constructor() { }

  ngOnInit() {
    console.log("activityComment.componenet ha sido cargado");
    this.activityComment = this.activitycomment_object;
    console.log(this.activityComment);

    this.commentTextForView = this.activityComment.text;
    this.formatComment();
  }

  formatComment(){
    var string = this.activityComment.text;

    string = string.replace(/(^|\s)(#[a-z\d-]+)/ig, "$1<span class='tag label label-info ng-star-inserted'>$2</span>");

    this.commentTextForView =string;
  }

}