export class Comment{
	constructor(
		public _id: string,
        public text:string,
		public emitter:string,  
		public topic:string,
		public created_at:string,
	){}
}