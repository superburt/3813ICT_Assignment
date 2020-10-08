import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class NewUserComponent implements OnInit {

  constructor(public userService: UserService, private http:HttpClient, private router: Router) { }
  email : String = "";
  newUsername : String = "";
  newUserPwd : String = "";
  newUserRole : String = "";
  newUserCredentials = {};
  success = null;
  CurrentUserRole : String = localStorage.getItem('currentUserRole');
  isSuper : Boolean;

  ngOnInit(): void {
    if (localStorage.getItem('currentUserRole') == "Super" || localStorage.getItem('currentUserRole') == "Group Admin" ){
      this.isSuper = true;   
  } else {
      this.isSuper = false;
  }
  }
  // This function creates a new user and based on the role of the current user, assigns them a role. 
  createUser(newUsername, newUserPwd){
    this.CurrentUserRole = localStorage.getItem('currentUserRole');
    if (this.CurrentUserRole == "Super" ){
        this.newUserRole = "Group Admin"
    } else if (this.CurrentUserRole == "Group Admin" ){
        this.newUserRole = "Group Assis"
    }

    if(newUserPwd && newUsername){
      let newUserCredentials = {username : this.newUsername, pwd : this.newUserPwd, email : this.email, role : this.newUserRole};
      this.userService.addUser(newUserCredentials).subscribe((data: any) => {
        this.success = data;
        if (this.success.valid == false){
          alert("This one's taken! Try another!")
        }else{ 
          this.router.navigateByUrl('');
        }
        })
    } else {
      alert("You have to give me more information than that!");
    }
  }
}
