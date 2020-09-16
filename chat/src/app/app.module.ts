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