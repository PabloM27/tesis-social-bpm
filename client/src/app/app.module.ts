import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import{HttpClientModule} from '@angular/common/http';
import{routing,appRoutingProviders} from './app.routing';


//componenets
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { ProcessComponent } from './components/process/process.component';

//servicios
import {UserService} from './services/user.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    ProcessComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpClientModule
  ],
  providers: [appRoutingProviders,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
