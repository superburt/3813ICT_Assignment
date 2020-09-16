import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AccountsComponent } from './accounts/accounts.component';

const routes: Routes = [
  {path: 'chat', component: ChatComponent},
  {path: '', component: LoginComponent},
  {path: 'register', component: AddUserComponent},
  {path: 'accounts', component: AccountsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }