import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Process } from '../../models/process';
import { Topic } from '../../models/topic';
import { UserService } from '../../services/user.service';
import { ProcessService } from '../../services/process.service';
import { TopicService } from '../../services/topic.service';
import { User } from '../../models/user';
import { GLOBAL } from '../../services/global';
import { parseTemplate } from '@angular/compiler';

@Component({
  /* selector: 'app-process-topics',*/
  templateUrl: './process-topics.component.html',
  styleUrls: ['../../../styles.css', './process-topics.component.css'],
  providers: [UserService, ProcessService, TopicService]
  /* encapsulation: ViewEncapsulation.Emulated*/
})

/*Componente para mostrar listado de topicos de un proceso
o un topico en particular si es seleccionado */
export class ProcessTopicsComponent implements OnInit {
  public idProcessBPM: string;
  public idProcess: string;
  public identity;
  public token;
  public title;
  public url;
  public topics = [];
  public process: Process;
  public selectedTopic: Topic;
  public topicText: string;
  public topicTitle: string;
  public createTopic: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _processService: ProcessService,
    private _topic: TopicService
  ) {
    this.title = 'Topicos';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this._route.paramMap.subscribe(
      params => {
        this.idProcessBPM = params.get('idprocess');
      }


    )

    console.log("process-topic.componenet ha sido cargado" + this.idProcessBPM);
    this.loadTopics();
    //console.log("el id del proceso?"+this.idProcess);
  }

  getTopicsProcess() {
    console.log(" * *** * * " + this.idProcess);
    this._topic.getTopics(this.idProcess).subscribe(
      response => {

        if (response.topics) {
          console.log("los topicos fueron cargados");
          console.log(response.topics);
          this.topics = response.topics;
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  loadTopics() {
    // buscar id de proceso - con el idProcessBPM
    console.log("load " + this.idProcessBPM);
    this._processService.getProcess(this.idProcessBPM).subscribe(
      response => {
        console.log("dasda     " + response.process);
        if (response.process) {
          this.idProcess = response.process._id;
          this.getTopicsProcess();
        }
      },
      error => {
        console.log(<any>error);
      }
    );


  }

  /*
  Evento que captura cuando el componente del proceso lee el proceso
  ProcessTipics necesita el proceso para obtener la coleccion de topicos
   */
  refreshProcessOutPut(event = null) {
    this.process = event.readProcess;
  }

  showTopic(idTopic) {
    //console.log("el topico leido es "+idTopic);
    this.selectedTopic = idTopic;
    this.createTopic = "";
    //si tenemos este id de topic instanciamos
    //componente de topic-message
  }
  backTopicList() {
    this.selectedTopic = null;
    this.createTopic = "";
  }

  addTopic() {
    //this.createTopic = "true";
    /*
    public _id: string,
		public title:string,
		public description:string,
		public messages:Array<string>,
		public comments:Array<string>,
		public owner:string,
		public created_at:string,
		public updated_at:string,
    */
    console.log(" ********* ");
    console.log("proceso: " + this.idProcess);
    var xTopic = new Topic("", String(this.topicTitle), String(this.topicText), String(this.idProcess), this.identity._id, "", "");
    this._topic.createTopic(xTopic).subscribe(
      response => {
        if (response.topic) {
          this.topics.push(response.topic)
          this.backTopicList();
        } else {
          console.log("error creando topic");
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
      }
    )
  }

  showCreateTopic() {
    this.createTopic = "true";
  }

}
