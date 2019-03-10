import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

//import  {UserGuard}  from './services/user.guard';


//componentes
import { LoginComponent } from './components/login/login.component';


const appRoutes: Routes = [
{path:'',component:LoginComponent},
{path:'home',component:LoginComponent},
{path:'login',component:LoginComponent}
];

export const appRoutingProviders: any [] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);