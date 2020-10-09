Software Frameworks Assignment Part 2 – Joshua Burt
S5127180 – 2020 – Trimester 2 – Kaile Su
Documentation
1)	Describe the organization of your Git repository and how you used it during the
development of your solution

By utilizing a simple dual-branch system, this project has been developed in development vs production versions. Changes are made to the dev branch throughout development, and where holistic milestones are reached, these are pushed into and then merged into the master branch. Commit logs in the last 24hrs of development are less than desirable due to the time crunch and a vscode issue that really made it difficult to complete on time. An additional failsafe and good development practice here would have been a 3rd back-up branch for big milestones in development, in case of user error or most unlikely system error. The dev branch was also under utilized here, but the basic concepts of commit, merge, pull and push have all been utilized though out the process 
MASTER BRANCH 


DEV BRANCH 


2)	Description of data structures used in both the client and server sides to represent
the various entities, e.g.: users, groups, channels, etc.

In this project users interact with data in the context of a form that is either created (new) or checked with the server for registering and verification. In this form we use data -> Users, Groups, Channels. Each of these classes have their own properties. The User class has properties email, pwd, username, userID, role, and valid. The form a user submits will check if the submitted data matches a record stored on the MongoDB and if it does it will log the user in with their respective privileges. Groups and channels are two classes that  for each group of channel chat, there exists a list of users that are members(Members) as a property and an additional property that for each chat had a each message recorded along with the time of submission to the server and the name and userID of the submitter. 
Seen below are the MongoDB instructions to create the respective data collections. The user data is typed by user.ts to adhere to data types. 

Our MongoDB is defined as ‘chatDB’. We insert the below data into the table created by the server on loading. 

db.users.insertMany([
{ id: "0", username: "Frodo", pwd: "pwd1", email: "email1", role: "Super", imgSrc: "gondor.png", valid: "true"},
{ id: "1", username: "Gandalf", pwd: "pwd2", email: "email2", role: "Group Admin", imgSrc: "gondor.jpg", valid: "true"},
{ id: "2", username: "Aragorn", pwd: "pwd3", email: "email3", role: "Group Assis", imgSrc: "gondor.jpg", valid: "true"}
]);
db.channel.insertMany([
{ channelName: "Channel 1", chatHist: [{chatChat: "testChat"}, {chatChat: "testChat6"}]},
{ channelName: "Channel 2", chatHist: [{chatChat: "testChat2"}, {chatChat: "testChat7"}]},
{ channelName: "Channel 3", chatHist: [{chatChat: "testChat3"}, {chatChat: "testChat8"}]},
{ channelName: "Channel 4", chatHist: [{chatChat: "testChat4"}, {chatChat: "testChat9"}]},
{ channelName: "Channel 5", chatHist: [{chatChat: "testChat5"}, {chatChat: "testChat10"}]}
]);
db.chat.insertMany([
{ chatChat:"testChat11", sender: "Frodo", channel: "channel 1" },
{ chatChat:"testChat12", sender: "Gandalf", channel: "channel 2" },
{ chatChat:"testChat13", sender: "Aragorn", channel: "channel 3" },
{ chatChat:"testChat14", sender: "Frodo", channel: "channel 4" }
]);
db.group.insertMany([
{ groupName : "Group 1", groupMembers: [{username: "Frodo"}, {username: "Aragorn"}], channelSet: [{channelName: "Channel 1"}, {channelName : "Channel 2"}]},
{ groupName : "Group 2", groupMembers: [{username: "Gandalf"}, {username: "Aragorn"}], channelSet: [{channelName: "Channel 3"}]},
{ groupName : "Group 3", groupMembers: [{username: "Gandalf"}, {username: "Aragorn"}], channelSet: [{channelName: "Channel 3"}, {channelName : "Channel 4"}]}
]);
db.channel.insertMany([
{ channelName: "Channel 1", chatHist: [{sender: "Frodo", chatChat: "testChat15"}, {sender: "Gandalf", chatChat: "testChat16"}]},
{ channelName: "Channel 2", chatHist: [{sender: "Frodo", chatChat: "testChat17"}, {sender: "Gandalf", chatChat: "testChat18"}]},
{ channelName: "Channel 3", chatHist: [{sender: "Frodo", chatChat: "testChat19"}, {sender: "Gandalf", chatChat: "testChat20"}]},
]);

3)	REST API

The angular front end communicates with the node.js server using REST API. The REST API utilizes the following routes: addUser, auth, getUser, imgUpload, readUsers, removeUser, updateUser. 

Each of these routes has their own .js route file. 

AddUser: This functionality submits a new user to the mongo database and then returns the newVal aka the user to the local browser. 

Auth: This functionality simply looks for the submitted email and password in the mongo database and returns the user data if it’s a match  and if it does not match, it returns valid: "false", which in the component will prompt the user to log in.

getUser: This functionality gets a single user from the user collection in the mongo database, according to the id inputted and returns the user’s data to the client.

imgUpload: This function takes an image selected by a user and uploads it to the Images folder if it is valid.

readUsers: A simple functionality to return the collection of users in the mongo database

removeUser: Gets the id in mongoDB of the user that is being requested for deletion in the form

updateUser: This utilizes the mongo database to match the request id to the stored values matching the same id in the database. It returns the user’s data to the client.



Below can be seen the require functions in the server.js file that is requiring essentially all of     our routes that utilized the REST API to interact with the client and MongoDB
    require('./routes/readUsers.js')(db, app);
    require('./routes/getUser.js')(db, app);
    require('./routes/auth.js')(db, app);
    require('./routes/updateUser.js')(db, app, ObjectID);
    require('./routes/addUser.js')(db, app);
    require('./routes/imgUpload.js')(db, app, formidable);
    require('./routes/removeUser.js')(db, app, ObjectID);


4)	Angular architecture: components, services, models, routes.


Components:

	Account:
This component is for SuperAdmins. They can navigate here from the Accounts page by clicking on update an account. Then the admin can edit the Username, Password, Role and Email of a given user. Utilizes the UpdateUser function. This function updates the user details based off of the form input through communication with the database
	
	Account-settings: 
Modify account details of the logged in user. Upload an image and submit the data and then submit the changed data to the mongoDB to be written.
	
	Accounts:
View all accounts in the system. Delete an account or navigate to the  account’s page if a SuperAdmin is logged in, and from there update the account details. 
	

	Add-user:
	This component primarily  creates a new user and based on the role of the current user, assigns them a role. It is also responsible for the html displaying the page itself. 
	
	Chat:
 The chat component provides a html file and css file that define how the chat page looks, and the .ts file to define how these pages behave with methods defined for the chat component class like initToConnection that defines the initialisation socket method. Essentially, this component defines how the chat page should look, the form fields displayed and the functions that pass inputted data to other functions that end up displaying chats as well as joining groups/channels and assigning a user if you’re a SuperAdmin


	Login:
Enter your credentials here, and if correct, login through the auth route. Subscribe to this data. If credentials are wrong, receive an error message. Set localStorage to the currently signed in user if successful. 








 Chat, login, add-user, and account
The chat component provides a html file and css file that define how the chat page looks, and the .ts file to define how these pages behave with methods defined for the chat component class like initToConnection that defines the initialisation socket method. 

The login component defines the login page, similarly to the chat component. 

The add_user component defines a component where a super admin can create new users. 

The account component simply defines a component where the logged in user can see their account details




Services:

 	Chat: 
This service defines observables and emits events for actions like user assign, chat, chatHist, group etc. 

User: 
This service is responsible for the routes within the server interacting with the mongodb to perform db actions and return some values. For example updateUser REST API route. These routes are being used to post and get data to the client and mongoDB. 

Image:
This service is not fully complete I think – needs more work for integrating images into chat messages. Otherwise, this serves the API route for imgUpload within the imgUpload function and posts the selected image. 


 – these both serve to provide the functionality for the chat service and its functionality (sending and receiving messages) and the register service and its functionality (adding a new user) (utilizing sockets/observables) 



Models:
 
User Class model in user.ts 
This model binds the user class to the behaviour defined within it. If email is string, then email property data in the form of an integer will not be valid. 

