import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user/add-user.component';
import { AccountsComponent } from './accounts/accounts.component'
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MessageService } from "./services/message.service";


@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    ChatComponent,
    AddUserComponent,
    AccountsComponent
  ],
  imports: [
    BrowserModule, RouterModule,AppRoutingModule, FormsModule, HttpClientModule, CommonModule

  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

class Person { 
  public name: string; 
  constructor(name: string) {this.name = name; }
}
class Employee extends Person { 
private department: string;
constructor(name: string, department: string) {
  super(name);    
  this.department = department; 
}
public getElevatorPitch() {
   return `Hello, my name is ${this.name} and I work in ${this.department}.`;  }
}
let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name);