import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../services/user.service";
import { ImageUploadService } from "../services/image.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  constructor(private router: Router, public userService: UserService, public imageUploadService: ImageUploadService, private http:HttpClient) { }
  selectedFile = null;
  imagePath = "";
  imagePath2 = "src/assets/";;
  pwd = "";
  id = "";
  role = "";
  email  = "";
  imgSrc =  "";
  username  = "";
  currentUserId = ""
  currentUser = {username : this.username, id : this.id, pwd: this.pwd, role : this.role, email : this.email }
  IdUpdate = "";


  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('currentUserId');
    this.userService.getUser(this.currentUserId).subscribe((data) =>{
      this.currentUser = data;
      this.username = data.username
      this.pwd = data.pwd;
      this.email = data.email
      this.role = data.role;
      this.id = data.id
      this.imgSrc = "assets/Images/" + data.imgSrc;
      console.log(this.imgSrc)
    })
  }
  
  FileSelected(event){
    this.selectedFile = event.target.files[0];
  }
// This function sets mongo to updated user details
  UpdateUser(newUsername,newEmail, newRole, newPwd){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.imageUploadService.imgUpload(fd).subscribe(data =>{

      this.imagePath = data.filename;
      this.imgSrc = "assets/Images/" + data.filename;
    let currentUser = {id: this.id, username: newUsername, pwd: newPwd, email : newEmail, role: newRole, imgSrc: this.selectedFile.name, valid : "true"};
    this.userService.updateUser(currentUser).subscribe((data: any) => {
    })
  })
  }

  
}
