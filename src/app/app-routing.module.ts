import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './_components/home/home.component';
import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';
import { AuthGuard } from './_helpers/auth.guard';
import { PageNotFoundComponent } from './_components/page-not-found/page-not-found.component';
import { RacunComponent } from './_components/racun/racun.component';
import { VrstaProizvodaComponent } from './_components/vrsta-proizvoda/vrsta-proizvoda.component';
import { ProizvodjacComponent } from './_components/proizvodjac/proizvodjac.component';
import { ProizvodComponent } from './_components/proizvod/proizvod.component';
import { ProdavacComponent } from './_components/prodavac/prodavac.component';
import { PorudzbinaComponent } from './_components/porudzbina/porudzbina.component';
import { IzvestajComponent } from './_components/izvestaj/izvestaj.component';
import { DobavljacComponent } from './_components/dobavljac/dobavljac.component';
import { KorisnikComponent } from './_components/korisnik/korisnik.component';
import { ZaposleniGuard } from './_helpers/zaposleni.guard';
import { MenadzerGuard } from './_helpers/menadzer.guard';
import { ResetPasswordComponent } from './_components/reset-password/reset-password.component';
import { EmailInputComponent } from './_components/email-input/email-input.component';
import { MenadzerComponent } from './_components/menadzer/menadzer.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'emailInput', component: EmailInputComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'dobavljac', component: DobavljacComponent, canActivate: [ZaposleniGuard] },
  { path: 'izvestaj', component: IzvestajComponent, canActivate: [MenadzerGuard] },
  { path: 'korisnik', component: KorisnikComponent, canActivate: [AuthGuard] },
  { path: 'menadzer', component: MenadzerComponent, canActivate: [ZaposleniGuard] },
  { path: 'porudzbina', component: PorudzbinaComponent, canActivate: [AuthGuard] },
  { path: 'prodavac', component: ProdavacComponent, canActivate: [MenadzerGuard] },
  { path: 'proizvod', component: ProizvodComponent, canActivate: [ZaposleniGuard] },
  { path: 'proizvodjac', component: ProizvodjacComponent, canActivate: [ZaposleniGuard] },
  { path: 'racun', component: RacunComponent, canActivate: [ZaposleniGuard] },
  { path: 'vrstaProizvoda', component: VrstaProizvodaComponent, canActivate: [ZaposleniGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }