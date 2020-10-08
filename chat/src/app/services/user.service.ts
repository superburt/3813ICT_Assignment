import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { User } from '../user';

const SERVER_URL = 'http://localhost:3000/'; 

@Injectable({
  providedIn: 'root'
})

export class UserService {

//these functions correlate 1:1 with the routes for interacting with the mongodb to perform db action and return some values
  constructor(private http: HttpClient) { }
  addUser(credentials){
    return this.http.post<any>("http://localhost:3000/api/addUser", credentials);
  }
  getUsers(){
    return this.http.get<any>("http://localhost:3000/api/readUsers");
  }
  updateUser(user: User){
    return this.http.post<any>("http://localhost:3000/api/updateUser", user);
  }
  removeUser(IdDelete){
    return this.http.post<any>("http://localhost:3000/api/removeUser", {"id" : IdDelete});
  }
  auth(credentials){
    return this.http.post<any>("http://localhost:3000/api/auth", credentials);
  }
  getUser(IdUpdate){
    return this.http.post<any>("http://localhost:3000/api/getUser", {"id" : IdUpdate});
  }
}
