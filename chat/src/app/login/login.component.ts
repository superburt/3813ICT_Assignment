import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const backend_url = "http://localhost:3000";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {}
  email="";
  pwd="";
  ioConnection: any;
  isValid = ""
  constructor(private router: Router, public userService: UserService, private http:HttpClient) { }

  ngOnInit(): void {
    if (localStorage.getItem('valid') == "true"){
      this.isValid == "true"
      this.router.navigateByUrl('chat');
  } else {
      this.isValid == "false"
  }
}
  public login( pwd, email){
    this.credentials = {pwd: this.pwd, email: this.email}
    this.userService.auth(this.credentials).subscribe((data: any) => {
      if (data.valid == "true"){
        this.isValid == "true";
        console.log(data)
        localStorage.setItem('currentUser', data.username)
        localStorage.setItem('valid', "true")
        localStorage.setItem('currentUserRole', data.role)
        localStorage.setItem('currentUserId', data.id)
        this.router.navigateByUrl('chat');
      } else {
        alert('Sorry, but the credentials you entered do not match anything in our system. Please try again.')
        this.isValid == "false"
      }
    });
  }
}
