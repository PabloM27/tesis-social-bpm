import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { Process } from '../../models/process';
import { UserService } from '../../services/user.service';
import { ProcessService } from '../../services/process.service';
import { GLOBAL } from '../../services/global';

@Component({
	selector: 'process',
	templateUrl: './process.component.html',
	providers: [UserService, ProcessService]
})

export class ProcessComponent implements OnInit {
	public user: User;
	public title: string;
	public identity;
	public token;
	public status: string;
	public url;
	public process: Process;
	//Output
	@Output() eventEmmiterProcess = new EventEmitter();
	@Input() idProcess;
	constructor(
		private _userService: UserService,
		private _processService: ProcessService,
	) {
		this.title = 'Proceso';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
	}

	ngOnInit() {
		console.log("process.componenet ha sido cargadooo");
		this.loadProcessData();
	}

	loadProcessData() {
		this.getProcess();
	}

	getProcess() {
			var idProcess = "5a98ecb6-2029-4ce4-9dc0-25227aa1b030";//this.idProcess;
			console.log("parametros" + idProcess)
			//console.log(params);
			/*if(!params['idprocess']){
					idProcess = "5c959adbb9a09c23c083c1e7";
			}*/
			console.log("el ide es" + idProcess);

			this._processService.getProcess(idProcess).subscribe(
				response => {
					if (response.process) {
						console.log("el proceso leido es");
						console.log(response.process);
						this.process = response.process;
						this.eventEmmiterProcess.emit({ readProcess: this.process });
					} else {
						this.status = 'error';
						console.log("errorrrr");
					}
				},
				error => {
					console.log("errorrrr2");
					console.log(<any>error);
				}
			)
	}
}