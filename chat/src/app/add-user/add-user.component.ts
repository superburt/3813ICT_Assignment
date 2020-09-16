import { Component, OnInit } from '@angular/core';
import { RegisterService } from "../services/register.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private registerService : RegisterService, private router : Router) { }
  currentUserCount = Number(localStorage.getItem('userCount'))
  userId : number = this.currentUserCount + 1;
  username ="";
  pwd = "";
  email = "";
  addUser = {};
  role = "Group Admin";
  isSuper : boolean = false;
  elseBlock ="";
  CurrentUserRole = localStorage.getItem('role');
  ioConnection: any;
//check if user = superadmin vs group admin
  ngOnInit(): void {
    this.initToConnection();
    if (localStorage.getItem('role') == "Super" || localStorage.getItem('role') == "Group Admin" ){
      this.isSuper = true;   
  } else {
      this.isSuper = false;
  }
}
  private initToConnection(){
    this.registerService.initSocket();
    }
  public AddUser(){
    this.addUser = {email: this.email, pwd: this.pwd, userId: this.userId, role: this.role, username: this.username, valid : "true", CurrentUserRole: this.CurrentUserRole};
    this.registerService.sendaddUser(this.addUser);
    this.addUser = null;
    this.userId = 0;
    this.email = "";
    this.pwd = "";
    this.username ="";
    this.role = "";
    this.router.navigateByUrl('accounts');
  }
}