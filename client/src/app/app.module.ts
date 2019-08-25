
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { MomentModule } from 'angular2-moment';
//agrego julio import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//agrego julio import { createCustomElement } from '@angular/elements';
//agrego julio import {APP_BASE_HREF} from '@angular/common';

//componenets
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { ProcessComponent } from './components/process/process.component';
import { TopicComponent } from './components/topic/topic.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

//servicios
import { UserService } from './services/user.service';
import { ProcessTopicsComponent } from './components/process-topics/process-topics.component';
import { TopicCommentsComponent } from './components/topic-comments/topic-comments.component';
import { CommentComponent } from './components/comment/comment.component';
import { ExecutionSelectorComponent } from './components/execution-selector/execution-selector.component';
import { ActivitycommentsComponent } from './components/activitycomments/activitycomments.component';
import { ActivityCommentComponent } from './components/activity-comment/activity-comment.component';
import { InfoUserComponent } from './components/info-user/info-user.component';
//angular material
import { MaterialModule } from './material.module';

//charts
import {ChartsModule} from 'ng2-charts';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
    ExecutionSelectorComponent,
    ActivitycommentsComponent,
    InfoUserComponent,
    ActivityCommentComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    HttpClientModule,
    MomentModule,
    MaterialModule,
    ChartsModule ,

    BrowserAnimationsModule  
  ],
  providers: [appRoutingProviders, UserService],
  bootstrap: [AppComponent]
  //agrego julio providers: [{provide: APP_BASE_HREF, useValue : '/' }],
  //agrego julio entryComponents: [ActivitycommentComponent,ProcessTopicsComponent,AppComponent]
})
export class AppModule {

  /*constructor(private injector: Injector) { }

  ngDoBootstrap() {
    const processTopicsComponent = createCustomElement(ProcessTopicsComponent,{ injector: this.injector });
    customElements.define('app-process-topics', processTopicsComponent);

    const activitycommentComponent = createCustomElement(ActivitycommentComponent,{ injector: this.injector });
    customElements.define('app-activitycomment', activitycommentComponent);
    
    
}*/
 
}
