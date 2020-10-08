import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

const SERVER_URL = 'http://localhost:3000/'; 

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient) { }
  
  imgUpload(fd){
    return this.http.post<any>("http://localhost:3000/api/imgUpload", fd);
  }
}
