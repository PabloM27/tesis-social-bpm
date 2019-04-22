import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import{HttpClientModule} from '@angular/common/http';
import{routing,appRoutingProviders} from './app.routing';
import {MomentModule} from 'angular2-moment';

//componenets
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { ProcessComponent } from './components/process/process.component';
import { TopicComponent } from './components/topic/topic.component';

//servicios
import {UserService} from './services/user.service';
import { ProcessTopicsComponent } from './components/process-topics/process-topics.component';
import { TopicCommentsComponent } from './components/topic-comments/topic-comments.component';
import { CommentComponent } from './components/comment/comment.component';
import { ExecutionSelectorComponent } from './components/execution-selector/execution-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    ProcessComponent,
    TopicComponent,
    ProcessTopicsComponent,
    TopicCommentsComponent,
    CommentComponent,
    ExecutionSelectorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpClientModule,
    MomentModule
  ],
  providers: [appRoutingProviders,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
