export class  Process{
	constructor(
		public _id: string,
		public idProcessBPM:string,
        public processVersion:string, //idVersionBPM
        public title:string,
        public description:string,
        //public topics:Array<string>,
        public created_at:string,
        public updated_at:string,
	){}
}