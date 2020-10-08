import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { ChatService } from "./services/chat.service";
import { NewUserComponent } from './add-user/add-user.component';
import { AccountComponent } from './account/account.component';
import { AppComponent } from './app.component';
import { UserService } from "./services/user.service";
import { ImageUploadService } from "./services/image.service";
import { AccountsComponent } from './accounts/accounts.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    AccountsComponent,
    AccountSettingsComponent,
    ChatComponent,
    LoginComponent,
    NewUserComponent
  ],
  imports: [
    BrowserModule, RouterModule, CommonModule, AppRoutingModule, FormsModule, HttpClientModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
