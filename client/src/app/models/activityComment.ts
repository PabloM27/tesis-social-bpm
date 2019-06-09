
export class  ActivityComment{ //cambiar a ActivityComments
	constructor(
		public _id: string,
		public text:string,
		public hashtags:Array<string>,
		public process:string,
		public activity:string,
        public emitter:string,  
        public created_at:string,
	){}
}