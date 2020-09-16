import { RegisterService } from "../services/register.service";
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  constructor(public registerService: RegisterService, private router :Router) { }
  ListOfusers = [];
  ioConnection: any;
  isSuper : boolean = false;
  userIdToElevate = "";
  userIds = [];
  usernames = [];
  userRole = [];
  deletedUserId = "";
  
  ngOnInit(): void {
    this.initToConnection();
    this.getUsers();
    if (localStorage.getItem('role') == "Super"){
      this.isSuper = true;   
  } else {
      this.isSuper = false;
  }
}
  private initToConnection(){
    this.registerService.initSocket();
    }
  public getUsers(){
    this.ioConnection = this.registerService.onInit().subscribe((getUsers: any)=> {
      localStorage.setItem('userCount', getUsers.length)
      for (let i = 0; i< getUsers.length; i++){
        this.usernames.push(getUsers[i].username);
        this.userRole.push(getUsers[i].role);
        this.userIds.push(getUsers[i].userId);
      }
    });
  }
  public ElevateUser(userIdToElevate){
    this.registerService.sendElevateUser(this.userIdToElevate)
    this.userIdToElevate = null
    this.ioConnection = this.registerService.onInit().subscribe((getUsers: any)=> {
      this.usernames = [];
      this.userRole = [];
      this.userIds = [];
      for (let i = 0; i< getUsers.length; i++){
        this.usernames.push(getUsers[i].username)
        this.userRole.push(getUsers[i].role)
        this.userIds.push(getUsers[i].userId)
        
        
      }
    }); 
  }
  public deleteUser(deletedUserId){
    this.registerService.sendDeletedUser(this.deletedUserId);
    this.deletedUserId = null;
    this.ioConnection = this.registerService.onInit().subscribe((getUsers: any)=> {
      this.userIds = [];
      this.usernames = [];
      this.userRole = [];
      for (let i = 0; i< getUsers.length; i++){
        this.userRole.push(getUsers[i].role)
        this.usernames.push(getUsers[i].username)
        this.userIds.push(getUsers[i].userId)
      }
    }); 
  }
}