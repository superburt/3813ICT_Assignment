  export class User  {
    email: string;
    age: string;
    username: string;
    pwd: string;
    birthdate: string;
    valid: string;
    constructor(email: string = "", pwd : string = "",birthdate: string = "",age: string = "", username:string = "", valid: string =""){
        this.pwd = pwd;
        this.email = email;
        this.username = username;
        this.birthdate = birthdate;
        this.age = age;
        this.valid = valid;
    }
}