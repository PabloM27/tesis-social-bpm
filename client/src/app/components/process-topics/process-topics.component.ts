import { Component, OnInit, Input } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {Process} from '../../models/process';
import {Topic} from '../../models/topic';
import{UserService} from '../../services/user.service';
import{ProcessService} from '../../services/process.service';
import{TopicService} from '../../services/topic.service';
import { User } from '../../models/user';
import {GLOBAL} from '../../services/global';

@Component({
 /* selector: 'app-process-topics',*/
  templateUrl: './process-topics.component.html',
  styleUrls: ['../../../styles.css','./process-topics.component.css'],
  providers:[UserService,ProcessService,TopicService]
})

/*Componente para mostrar listado de topicos de un proceso
o un topico en particular si es seleccionado */
export class ProcessTopicsComponent implements OnInit {
  @Input() idProcess :String;
	public identity;
	public token;
  public title;
  public url;
  public process:Process;
  public selectedTopic:String;
	
	constructor(
	//	private _router: Router,
        private _userService:UserService,
        private _processService:ProcessService,
	){
		this.title='Topicos'; 
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
	}

  ngOnInit() {
    console.log("process.componenet ha sido cargadooo");
    //this.loadSession();
  }

  /*
  Evento que captura cuando el componente del proceso lee el proceso
  ProcessTipics necesita el proceso para obtener la coleccion de topicos
   */
  refreshProcessOutPut(event = null){
    this.process = event.readProcess;
  }

  showTopic(idTopic){
    console.log("el topico leido es "+idTopic);
    this.selectedTopic = idTopic;
    //si tenemos este id de topic instanciamos
    //componente de topic-message
  }
  backList(){
    this.selectedTopic="";
  }
  
}
