
export class  ActivityComment{ //cambiar a ActivityComments
	constructor(
		public _id: string,
		public text:string,
		public hashtags:Array<string>,
		public idProcessBPM:String,
		public processVersion:String,
		public idActivityBPM:String,
		public process:string,
		public activity:string,
        public emitter:string,  
        public created_at:string,
	){}
}