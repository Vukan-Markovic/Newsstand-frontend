import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './_components/home/home.component';
import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent, data: { title: 'Igrac' }},
    { path: 'register', component: RegisterComponent },
    { path: '**', redirectTo: '' }
    // { path: '**', component: PageNotFoundComponent , data: { title: 'Invalid path'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }