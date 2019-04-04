import { Component, OnInit,Input } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {Topic} from '../../models/topic';
import{UserService} from '../../services/user.service';
import{ProcessService} from '../../services/process.service';
import{TopicService} from '../../services/topic.service';
import {GLOBAL} from '../../services/global';

@Component({
  selector: 'app-topic-comments',
  templateUrl: './topic-comments.component.html',
  styleUrls: ['./topic-comments.component.css'],
  providers:[UserService,TopicService]
})
export class TopicCommentsComponent implements OnInit {

  @Input() topic_selected_id: string = '';
  public identity;
  public token;
  public title;
  public url;
  public topic: Topic;
  public selectedTopic: Topic;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _topicService: TopicService
  ) {
    this.title = 'Topico y sus comentarios';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log("topicComments.component ha sido cargadooo");
    console.log("llego el id del topico a cargar"+this.topic_selected_id);
    this.loadTopicSelected();
    //to do leer el topico y mostar componente del topic y el listado 
    //de sus comentarios
    //puede leer el topico populado, puede mostrar todos los msj en el componenete
      //esto requiere que el componenete comentario pueda recibir en vez de un id el modelo del comment
    //puedo leer el tipico con solo id y leer varias veces el msj
  }

  loadTopicSelected(){
    if(this.topic_selected_id){
        this._topicService.getTopic(this.topic_selected_id).subscribe(
          response =>{
              if(response.topic){
                console.log("el topico leido en el componenet");
                console.log(response.topic);
                this.topic = response.topic;
              }
          },
          error =>{
            console.log(<any>error);
           
          }
        )						
      }
        
  }
}
