import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

//import  {UserGuard}  from './services/user.guard';


//componentes
import { LoginComponent } from './components/login/login.component';
import { ProcessComponent } from './components/process/process.component';
import { ProcessTopicsComponent } from './components/process-topics/process-topics.component';
import { ExecutionSelectorComponent } from './components/execution-selector/execution-selector.component';
import { ActivitycommentComponent } from './components/activitycomment/activitycomment.component';

const appRoutes: Routes = [
{path:'login',component:LoginComponent},
{path:'process-topics',component:ProcessTopicsComponent},
{path:'process-topics/:idprocess',component:ProcessTopicsComponent},
{path:'activitycomment',component:ActivitycommentComponent},
{path:'execution-selector/:idProcessBPM/:processVersion/:idActivityBPM/:idCase',component:ExecutionSelectorComponent},
];

export const appRoutingProviders: any [] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
