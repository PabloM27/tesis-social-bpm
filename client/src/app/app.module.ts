import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { MomentModule } from 'angular2-moment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { createCustomElement } from '@angular/elements';
import {APP_BASE_HREF} from '@angular/common';

//componenets
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { ProcessComponent } from './components/process/process.component';
import { TopicComponent } from './components/topic/topic.component';

//servicios
import { UserService } from './services/user.service';
import { ProcessTopicsComponent } from './components/process-topics/process-topics.component';
import { TopicCommentsComponent } from './components/topic-comments/topic-comments.component';
import { CommentComponent } from './components/comment/comment.component';
import { ExecutionSelectorComponent } from './components/execution-selector/execution-selector.component';
import { ActivitycommentComponent } from './components/activitycomment/activitycomment.component';
import { InfoUserComponent } from './components/info-user/info-user.component';

//angular material
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';

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
    ActivitycommentComponent,
    InfoUserComponent,
    ActivitycommentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    HttpClientModule,
    MomentModule,
    BrowserAnimationsModule,
    MaterialModule  
  ],
  /*providers: [appRoutingProviders, UserService],*/
  providers: [{provide: APP_BASE_HREF, useValue : '/' }],
  entryComponents: [ActivitycommentComponent,ProcessTopicsComponent,AppComponent]
})
export class AppModule {

  constructor(private injector: Injector) { }

  ngDoBootstrap() {
    const el = createCustomElement(ProcessTopicsComponent,{ injector: this.injector });
    customElements.define('app-process-topics', el);

    const el2 = createCustomElement(ActivitycommentComponent,{ injector: this.injector });
    customElements.define('app-activitycomment', el2);
/*
    const el3 = createCustomElement(AppComponent,{ injector: this.injector });
    customElements.define('app-root', el3);*/
  }
 
}
