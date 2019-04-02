import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

//import  {UserGuard}  from './services/user.guard';


//componentes
import { LoginComponent } from './components/login/login.component';
import { ProcessComponent } from './components/process/process.component';

const appRoutes: Routes = [
{path:'login',component:LoginComponent},
{path:'process-topics/',component:ProcessComponent},
{path:'process-topics/:idprocess',component:ProcessComponent}
];

export const appRoutingProviders: any [] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);