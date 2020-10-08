export class User  {
  email: string;
  id: string;
  pwd: string;
  role: string;
  username: string;
  valid: string;
  constructor(email: string = "", pwd : string = "",role: string = "",id: string = "", username:string = "", valid: string =""){
      this.email = email;
      this.pwd = pwd;
      this.username = username;
      this.role = role;
      this.id = id;
      this.valid = valid;
  }
}
//this file defines the type that User data should adhere to