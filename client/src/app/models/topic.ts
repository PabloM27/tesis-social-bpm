export class User{
	constructor(
		public _id: string,
		public title:string,
		public description:string,
		public messages:Array<string>,
		public owner:string,
		public created_at:string,
		public updated_at:string,
	){}
}
