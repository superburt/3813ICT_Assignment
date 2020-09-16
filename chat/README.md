Software Frameworks Assignment Part 1 – Joshua Burt
S5127180 – 2020 – Trimester 2 – Kaile Su
Documentation
1)	Describe the organization of your Git repository and how you used it during the
development of your solution

By utilizing a simple dual-branch system, this project has been developed in development vs production versions. Changes are made to the dev branch throughout development, and where holistic milestones are reached, such as a working chat feed or drop-down selector for rooms and channels – these are pushed into and then merged into the master branch. Due to time constraints and early bugs and having to reset the project with fresh configurations halfway due to importing cors into the wrong directory, frequent commits weren’t made and in fact only a few commits were regrettably made. This ideal approach theoretically would be perfectly suitable for a project this size, however to a certain extent this was not utilized as effectively as possible i.e. dev was pushed into master too infrequently. An additional failsafe and good development practice here would have been a 3rd back-up branch for big milestones in development, in case of user error or most unlikely system error. 

2)	Description of data structures used in both the client and server sides to represent
the various entities, e.g.: users, groups, channels, etc.

In this project users interact with data in the context of a form that is either created (new) or checked with the server for registering and verification. In this form we use data -> Users, Groups, Channels. Each of these classes have their own properties. The User class has properties email, pwd, username, userID, role, and valid. The form a user submits will check if the submitted data matches a record stored on the server and if it does it will log the user in with their respective privileges. Groups and channels are two classes that if this project implementation were to reach completion, would exist and within each – for each group of channel chat, there would exist a list of users that are members(Members) as a property and an additional property that for each chat had a each message recorded along with the time of submission to the server and the name and userID of the submitter. 


3)	Angular architecture: components, services, models, routes.

Components – Chat, login, add-user, and account
The chat component provides a html file and css file that define how the chat page looks, and the .ts file to define how these pages behave with methods defined for the chat component class like initToConnection that defines the initialisation socket method. 

The login component defines the login page, similarly to the chat component. 

The add_user component defines a component where a super admin can create new users. 

The account component simply defines a component where the logged in user can see their account details


Services – Message and Register – these both serve to provide the functionality for the chat service and its functionality (sending and receiving messages) and the register service and its functionality (adding a new user) (utilizing sockets/observables) 

Models – User Class model in user.ts 
This model binds the user class to the behaviour defined within it. If email is string, then email property data in the form of an integer will not be valid. 

Routes – Corresponding to each component there are 4 routes – 1 for each component

4)	Node server architecture: modules, functions, files, global variables.
The node server contains 4 .js files:  Server.js, Listen.js, Sockets.js, Data.js.
Server.js ->  This file is the server file that is used to import the cors, http, sockets, body parser, and express modules. Express is used for the REST API calls, http for http requests, sockets for utilizing sockets functionality like subscribe and listen, and body-parser for the JSON body parser that uses middleware to parse data incoming before the handlers do, cors is used to connect the express module with the project allowing resources to be requested from other domain names (cross-origin resource sharing). This file is the main “server file” and the listen.js and sockets.js files are imported into it as they are essentially the same file in terms of use and function but have different responsibilities and are therefore compartmentalised for code modularity.    
Listen.js -> This file is responsible for listening (“ “ ) to the port specified that is hosting the server to update for requests as they come through. 
Sockets.js -> This file is responsible for all things sockets in this server, like defining and setting up connections to sockets with rules for user authentication etc. 
Data.json -> This file is self-explanatory insofar as its role is simple to store user data. It is stored outside of the sever due to writing issues where when loading the server reading written data does not work. 


5)	A description of how you divided the responsibilities between client and server (you
are encouraged to have the server provide a REST API which returns JSON in
addition to a static directory)

An example of how REST API could have been used by utilizing Express in this project is seen below:
“
Static directory : app.use(express.static(__dirname + '/../dist/my-app'));
console.log(__dirname);
“

This would be used to connect to my chat and could be further utilized to handle log in and out requests. This project did not utilize REST API as at the end of development I did not realise until after I had already used sockets and did not have enough remaining time to utilize REST API. 

In terms of client server interaction the mentioned components interact with the message and register services. Utilizing observables we take values that are emitted by the server and import them to our components. These values are then displayed to the users in the app component view. Using sockets we take the clients requests and assign them to a socket event and then each event returns a value to the client that is specific to the request and the specified socket. 
An example of this can be seen below in the message send instance. 

 public send(message: string): void {
    this.socket.emit('message', message);
  }
-------------
export class ChatComponent implements OnInit {

  isValid: boolean = false
  sender =  localStorage.getItem('username');
  ioConnection: any;
  stringObj: any[];
  stringJson: any;
  messagecontent: string = "";
  messages  = [];
  newMessage = {};
  constructor(private messageService : MessageService, private router: Router) { }

  ngOnInit(): void {
    this.initToConnection();
    this.getMsg();
    if (localStorage.getItem('valid')){
      this.isValid = true
      console.log(localStorage.getItem('valid'))
    }
  }

private initToConnection(){
  this.messageService.initSocket();
}

public getMsg(){
  this.messages = [];
  this.ioConnection = this.messageService.onChat().subscribe((chat: any)=> {
    console.log(chat)
    for (let i = 0; i< chat.length; i++){
      this.messages = chat;
    }
  });
}

public chat(messagecontent){
  this.newMessage = {sender: this.sender, messagecontent: this.messagecontent};
  console.log(this.sender)
    if (this.messagecontent){
      console.log(this.messagecontent)
      this.messageService.sendChat(this.newMessage);
      this.messagecontent = null;
    } else {
      console.log('Failed to send message. Make sure text box is not empty.')
    }
  }
};


6)	A list of routes, parameters, return values, and purpose in the sever side

This project utilizes routes to direct users and their data. The AddUser route is used to make new users based on the input from the user form and the output is that the Data.JSON file is written to. DeleteUser is used to delete users from the JSON and together both of these utilize sockets to emit the current state of the Data.JSON. The chat route simply deals with chats – as one might guess – and takes messages being sent and stores them in the JSON -> then emitting the current state of the JSON back to the client where the message then populates for all active users into the chat feed. Auth is used is verify user’s login information simply by checking the JSON and emitting the result of the authentication check back. userElevated checks if the currently logged in user is in the SuperAdmin array and if yes, sets the role of the user with the ID of the user requested to be elevated, to the elevated role being requested. 
