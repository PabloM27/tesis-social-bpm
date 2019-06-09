import {Component,OnInit,Input } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {User} from '../../models/user';
import {Topic} from '../../models/topic';
import{UserService} from '../../services/user.service';
import{TopicService} from '../../services/topic.service';
import {GLOBAL} from '../../services/global';

@Component({
	selector: 'topic',
	templateUrl:'./topic.component.html',
	styleUrls: ['./topic.component.css'],
	providers:[UserService,TopicService]
})

export class TopicComponent implements OnInit{

	@Input() topic_id: string = '';
	@Input() public completo: string;

	public user:User;
	public title:string;
	public identity;
	public token;
	public status:string;
    public url;
	public topic:Topic;
	public classcompleto:string;
	
	constructor(
		//private _route:ActivatedRoute,
		//private _router: Router,
        private _userService:UserService,
        private _topicService:TopicService,
	){
		this.title='Topic'; 
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
	}

	ngOnInit(){
		console.log("topic.component ha sido cargadooo");
		console.log("me llego el id al topico "+this.topic_id+ " - "+ this.completo );
		this.loadTopicData();	
	}

	loadTopicData(){	
		this.getTopic();	
	}

	getTopic(){
		this._topicService.getTopic(this.topic_id).subscribe(
			response =>{
				if(response.topic){
                    console.log("el topico leido es");
                    console.log(response.topic);
					this.topic = response.topic;
				}else{
					this.status = 'error';
				}
			},
			error =>{
				console.log(<any>error);
				//this._router.navigate(['/']);
			}
		)

	}
}