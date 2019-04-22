import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { ActivityExecutor } from '../../models/activityExecutor';

import { WorkflowService } from '../../services/workflow.service';
import { UserService } from '../../services/user.service';

import { GLOBAL } from '../../services/global';


@Component({
	selector: 'app-execution-selector',
	templateUrl: './execution-selector.component.html',
	styleUrls: ['./execution-selector.component.css'],
	providers: [UserService, WorkflowService]
})
export class ExecutionSelectorComponent implements OnInit {

	public user: User;
	public title: string;
	public identity;
	public token;
	public status: string;
	public url;
	//lista de posibles usuarios
	public users: User[];
	public selectedUser: string;
	//execution data
	public activityExecutor: ActivityExecutor;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _workflowService: WorkflowService
	) {
		this.title = 'Selector de ejecucion';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
	}

	ngOnInit() {
		//cargar lista de usuarios
		this.loadAllUser();
		//lee si existe configuracion para la actividad en curso
		this.loadExecutionData();
	}

	loadAllUser() {
		this._userService.getAllUsers().subscribe(
			response => {
				if (!response.users) {
					this.status = 'error';
				} else {	
					this.users = response.users;	
				}
			},
			error => {
				var errorMessage = <any>error;
				console.log(errorMessage);
				if (errorMessage != null) {
					this.status = 'error';
				}
			}
		);

	}

	updateUser() {
		console.log("cambio")
		console.log(this.selectedUser);

	}

	setExecutor() {
		this.activityExecutor.idParticipant = this.selectedUser;
		if (this.activityExecutor._id != null && this.activityExecutor._id != '') {
			//actualiza
			this.updateExecutor();
		} else {
			//crea
			this.createExecutor();
		}
	}

	updateExecutor() {
		this._workflowService.updateActivityExecutor(this.activityExecutor).subscribe(
			response => {
				if (response.activityExecutor && response.activityExecutor._id) {
					this.status = 'success';
				} else {
					this.status = 'error';
				}
			},
			error => {
				console.log(<any>error)
			})
	}


	createExecutor() {
		this._workflowService.createActivityExecutor(this.activityExecutor).subscribe(
			response => {
				if (response.activityExecutor && response.activityExecutor._id) {
					this.status = 'success';
				} else {
					this.status = 'error';
				}
			},
			error => {
				console.log(<any>error)
			})
	}

	/*Carga los datos que envia el BPMS para configurar el workflow
		idProceso,versionProceso,idActividad,idCaso,idParticipant
	*/
	loadExecutionData() {
		this._route.params.subscribe(params => {

			var idProcessBPM = params['idProcessBPM'];
			var processVersion = params['processVersion'];
			var idActivityBPM = params['idActivityBPM'];
			var idCase = params['idCase'];

			this.activityExecutor = new ActivityExecutor('', idProcessBPM, processVersion, idActivityBPM, idCase, 'USER', '','','');
			//console.log(this.activityExecutor);
			this._workflowService.getActivityExecutor(this.activityExecutor).subscribe(
				response => {
					if (response) {
						//console.log("el activity executor leido es");
						this.activityExecutor = new ActivityExecutor
							(response._id, response.idProcessBPM,
								response.processVersion, response.idActivityBPM,
								response.idCase, response.type, response.idParticipant,'','');
						//console.log(this.activityExecutor);
						this.selectedUser = this.activityExecutor.idParticipant;
					} else {
						this.status = 'error';
					}
				},
				error => {
					console.log(<any>error);
					console.log(error.error.message);
				}
			)

		})
	}

}


