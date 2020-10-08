import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  IdDelete = "";
  userSet = [];
  constructor(private router: Router, public userService: UserService, private http:HttpClient) { }

  ngOnInit(): void {
    localStorage.setItem('currentID', "");
    this.userService.getUsers().subscribe((data) =>{
      this.userSet = data;
    })
  }

  IdUpdate(IdUpdate){
    localStorage.setItem('currentID' , IdUpdate);
    this.router.navigateByUrl('account');
  }
//This function deletes a user ID
  DeleteUser(IdDelete){
    this.userService.removeUser(IdDelete).subscribe((data) =>{
      this.userSet = data;
    })
  }
  
}
