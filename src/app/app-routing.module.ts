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
import { Menadzer } from './_models/menadzer';

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dobavljac', component: DobavljacComponent },
  { path: 'izvestaj', component: IzvestajComponent },
  { path: 'korisnik', component: KorisnikComponent },
  { path: 'menadzer', component: Menadzer },
  { path: 'porudzbina', component: PorudzbinaComponent },
  { path: 'prodavac', component: ProdavacComponent },
  { path: 'proizvod', component: ProizvodComponent },
  { path: 'proizvodjac', component: ProizvodjacComponent },
  { path: 'racun', component: RacunComponent },
  { path: 'vrstaProizvoda', component: VrstaProizvodaComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }