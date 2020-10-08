import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { HttpClient } from '@angular/common/http';

const SERVER_URL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket;

  stringObj: any[];
  stringJson: any;

  constructor(private http: HttpClient ) { }

  public initSocket(): void{
    this.socket = io(SERVER_URL);
  }

  public onInit(): Observable<any> {
    let observable = new Observable(observer=>{
      this.socket.on('chatChat', (data:any) => observer.next(data));
    })
    return observable;
  }
//This returns a chat history observable

  public chatHist(): Observable<any> {
    let observable = new Observable(observer=>{
      this.socket.on('chatHist', (chatHist) => observer.next(chatHist));
    })
    return observable;
  }
//This defines a group observable 
  public group(): Observable<any> {
    let observable = new Observable(observer=>{
      this.socket.on('group', (group) => observer.next(group));
    })
    
    return observable;
  }
//This defines a channel observable
  public channel(): Observable<any> {
    let observable = new Observable(observer=>{
      this.socket.on('channel', (channel) => observer.next(channel));
    })
    return observable;
  }
//This defines a user observable
  public user(): Observable<any> {
    let observable = new Observable(observer=>{
      this.socket.on('user', (user) => observer.next(user));
    })
    return observable;
  }

//Emits chathist event
  public sendchatHist(chatHist: any): void {
    this.socket.emit('chatHist', chatHist);
  }
//Emits channel event
  public sendchannel(channel: any): void {
    this.socket.emit('channel', channel);
  }
//Emits chat event
   public sendChat(chat: any): void {
    this.socket.emit('chat', chat);
  }
//Emits user event
  public sendUser(user: any): void {
    this.socket.emit('user', user);
  }
//Emits createNewChannel event
  public sendNewChannel(createNewChannel: any): void {
    this.socket.emit('createNewChannel', createNewChannel);
  }
//Emits Group event
  public sendGroup(group: any): void {
    this.socket.emit('group', group);
  }
//Emits user assign event
  public assignUser(userAssign): void {
    this.socket.emit('userAssign', userAssign);
  }
  
}
