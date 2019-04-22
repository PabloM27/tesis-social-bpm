export class ActivityExecutor{
	constructor(
		public _id: string,
        public idProcessBPM:string,
        public processVersion:string, 
        public idActivityBPM:string,  
        public idCase:string,  
        public type:string,  
        public idParticipant:string,
        public created_at:string,
		public updated_at:string,
	){}
}
