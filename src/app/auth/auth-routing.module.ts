import { NgModule } from '@angular/core'
import { Router, RouterModule, Routes } from '@angular/router'
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";


const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent}

]

@NgModule({
    imports: [
        // A diferencia de forRoot, estas rutas serían hijas que luego se fusionaran con el enrutador Root
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class AuthRoutingModule{}