import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private router: Router, public userService: UserService, private http:HttpClient) { }
  username  = "";
  id = "";
  pwd = "";
  email  = "";
  role = "";
  currentUser = {}
  IdUpdate = "";


  ngOnInit(): void {
    this.IdUpdate =  localStorage.getItem('currentID');
    this.userService.getUser(this.IdUpdate).subscribe((data) =>{
      this.currentUser = data;
      this.username = data.username
      this.id = data.id
      this.pwd = data.pwd;
      this.email = data.email
      this.role = data.role;
    })
  }
//This function updates the user details based off of the form input through communication with the database
  UpdateUser(username,email, role, pwd){
    let currentUser = {id: this.id, username: this.username, pwd: this.pwd, email : this.email, role: this.role, valid : "true"};
    this.userService.updateUser(currentUser).subscribe((data: any) => {
      this.router.navigateByUrl('/accounts');
    })
  }

}
