'use strict'
export class Activity{
	constructor(
		public _id: string,
		public idActivityBPM:string,
		public title:string,
		public description:string,
		public publications:Array<string>,
		public created_at:string,
		public updated_at:string,

	){}
}
