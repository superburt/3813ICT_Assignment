import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
//init variables
  chatChat: string = "";
  userAssign = {};
  ioConnection: any;
  createNewChannelName = "";
  chats  = [];
  newchat = {};
  createNewChannel = {};
  isValid: boolean = false
  isInChannel = false;
//users form selections
  channelSelected = "";
  groupSelected = "";
  groupSelectedToAssign = ""
  userSelected = "";
//channels groups and users sets
  setOfChannels = [];
  setOfGroups = [];
  setOfUsers = [];
//current *
  currentUser = "";
  currentUserRole = "";
  currentGroup = "";

  constructor(private chatService : ChatService, private router: Router) { }
//ngOnInitialisation - set these values
  ngOnInit(): void {
    this.currentUserRole = localStorage.getItem('currentUserRole');
    this.currentUser = localStorage.getItem('currentUser')
    this.initToConnection();
    if (localStorage.getItem('valid')){
      this.isValid = true
      console.log(localStorage.getItem('valid'))
    }
  }

//When we start sockets, we getGroups and getUsers and these become known from the mongodb
  private initToConnection(){
    this.chatService.initSocket();
    this.getGroups();
    this.getUsers();
  }

// This function assigns the chosen channel from the form input and feeds the chat history with chats for the channel
  public chooseChat(channelSelected){
    if (channelSelected){
      this.channelSelected = channelSelected;
      this.getChat();
    } else {
      alert("You must select a channel first! :)");
    }
  }
// This function selects a group based on form input
  public chooseGroup(groupSelected){
    if (groupSelected){
      localStorage.setItem('currentGroup', groupSelected);
      this.groupSelected = groupSelected;
      this.getChannels();
    } else {
      alert("You must select a group first! :)");
    }
  }
// This function simply serves to remove the selected channel and by extension, remove the chats for the channel from the view
  public exitChat(){
    this.channelSelected = "";
    this.chats = [];
  }
//This function gets the set of channels 
  public getChannels(){
    this.setOfChannels = [];
    this.chatService.sendchannel(localStorage.getItem('currentGroup'));
    this.ioConnection = this.chatService.channel().subscribe((channel: any)=> {
      this.setOfChannels = channel
    });
  }

// Gets the chat history for the channel selected - pretty simple
  public getChat(){
    let fromChannel = this.channelSelected
    this.chatService.sendchatHist(fromChannel);
    this.ioConnection = this.chatService.chatHist().subscribe((chatHist: any)=> {
      this.chats = [];
        for (let i = 0; i < chatHist.length; i++){
          this.chats.push(chatHist[i].chatChat);
        }
    });
  }


// This function simply returns users
  public getUsers(){
    this.chatService.sendUser("Get the Users Jarvis!");
    this.ioConnection = this.chatService.user().subscribe((user: any)=> {
      this.setOfUsers.push(user)
    });
  }


// This function gets groups for a given user 
  public getGroups(){
    this.setOfGroups = []
    this.setOfChannels = [];
    this.chatService.sendGroup(this.currentUser);
    this.ioConnection = this.chatService.group().subscribe((group: any)=> {
      this.setOfGroups = group
    });
  }


// This function adds a user to a group and its set of users
  public assignUser(groupSelectedToAssign, userSelected){
    this.userAssign = {groupName : groupSelectedToAssign, username: userSelected}
    if (userSelected && groupSelectedToAssign){
      this.chatService.assignUser(this.userAssign);
    } else {
      alert("You have to select both parameters before I can help :)")
    }
    
  }

// This function is responsible for the chat - saving new chats to chat history
// and showing all chat history
  public chat(chatChat){
    this.newchat = {chatChat: this.chatChat, channelName: this.channelSelected };
      if (this.chatChat){
        this.chatService.sendChat(this.newchat);
        this.chatChat = null;
        this.getChat();
      } else {
        alert(  'We could not send your chat because you made a mistake! Maybe you forgot to type something! Whoops!')
      }
  }

// This function makes a new channel then sets this new channel to the value of currentGroup.
  public createChannel(createNewChannelName){
    this.createNewChannel = {channelName :this.createNewChannelName, groupName: localStorage.getItem('currentGroup')};
      if (this.createNewChannelName){
        this.chatService.sendNewChannel(this.createNewChannel);
        this.createNewChannelName = null;
        this.getChannels();
      } else {
        alert('You have to make a selection silly!')
      }
  }
}
