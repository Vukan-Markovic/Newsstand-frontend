import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DobavljacDialogComponent } from './_components/dialogs/dobavljac-dialog/dobavljac-dialog.component';
import { IzvestajDialogComponent } from './_components/dialogs/izvestaj-dialog/izvestaj-dialog.component';
import { PorudzbinaDialogComponent } from './_components/dialogs/porudzbina-dialog/porudzbina-dialog.component';
import { ProizvodDialogComponent } from './_components/dialogs/proizvod-dialog/proizvod-dialog.component';
import { ProizvodjacDialogComponent } from './_components/dialogs/proizvodjac-dialog/proizvodjac-dialog.component';
import { RacunDialogComponent } from './_components/dialogs/racun-dialog/racun-dialog.component';
import { StavkaPorudzbineDialogComponent } from './_components/dialogs/stavka-porudzbine-dialog/stavka-porudzbine-dialog.component';
import { StavkaRacunaDialogComponent } from './_components/dialogs/stavka-racuna-dialog/stavka-racuna-dialog.component';
import { VrstaProizvodaDialogComponent } from './_components/dialogs/vrsta-proizvoda-dialog/vrsta-proizvoda-dialog.component';
import { ZaposleniDialogComponent } from './_components/dialogs/zaposleni-dialog/zaposleni-dialog.component';
import { DobavljacComponent } from './_components/dobavljac/dobavljac.component';
import { EmailInputComponent } from './_components/email-input/email-input.component';
import { HomeComponent } from './_components/home/home.component';
import { IzvestajComponent } from './_components/izvestaj/izvestaj.component';
import { KorisnikComponent } from './_components/korisnik/korisnik.component';
import { LoginComponent } from './_components/login/login.component';
import { PageNotFoundComponent } from './_components/page-not-found/page-not-found.component';
import { PorudzbinaComponent } from './_components/porudzbina/porudzbina.component';
import { ProizvodComponent } from './_components/proizvod/proizvod.component';
import { ProizvodjacComponent } from './_components/proizvodjac/proizvodjac.component';
import { RacunComponent } from './_components/racun/racun.component';
import { RegisterComponent } from './_components/register/register.component';
import { ResetPasswordComponent } from './_components/reset-password/reset-password.component';
import { VrstaProizvodaComponent } from './_components/vrsta-proizvoda/vrsta-proizvoda.component';
import { ZaposleniComponent } from './_components/zaposleni/zaposleni.component';
import { AuthGuard } from './_helpers/auth.guard';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { MenadzerGuard } from './_helpers/menadzer.guard';
import { ZaposleniGuard } from './_helpers/zaposleni.guard';
import { AuthenticationService } from './_services/authentication.service';
import { DobavljacService } from './_services/dobavljac.service';
import { IzvestajService } from './_services/izvestaj.service';
import { KorisnikService } from './_services/korisnik.service';
import { MenadzerService } from './_services/menadzer.service';
import { PorudzbinaService } from './_services/porudzbina.service';
import { ProdavacService } from './_services/prodavac.service';
import { ProizvodService } from './_services/proizvod.service';
import { ProizvodjacService } from './_services/proizvodjac.service';
import { RacunService } from './_services/racun.service';
import { StavkaPorudzbineService } from './_services/stavkaPorudzbine.service';
import { StavkaRacunaService } from './_services/stavkaRacuna.service';
import { VrstaProizvodaService } from './_services/vrstaProizvoda.service';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatCardModule,
        MatSidenavModule,
        MatListModule,
        MatGridListModule,
        MatExpansionModule,
        MatTableModule,
        MatToolbarModule,
        MatSelectModule,
        MatSnackBarModule,
        MatDialogModule,
        MatInputModule,
        MatNativeDateModule,
        FormsModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatSortModule,
        MatTooltipModule,
        MatStepperModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' })
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        DobavljacComponent,
        IzvestajComponent,
        PorudzbinaComponent,
        ProizvodComponent,
        ZaposleniComponent,
        ProizvodjacComponent,
        RacunComponent,
        VrstaProizvodaComponent,
        PageNotFoundComponent,
        DobavljacDialogComponent,
        IzvestajDialogComponent,
        PorudzbinaDialogComponent,
        ProizvodDialogComponent,
        ProizvodjacDialogComponent,
        RacunDialogComponent,
        VrstaProizvodaDialogComponent,
        KorisnikComponent,
        ZaposleniDialogComponent,
        ResetPasswordComponent,
        EmailInputComponent,
        StavkaRacunaDialogComponent,
        StavkaPorudzbineDialogComponent
    ],
    entryComponents: [
        DobavljacDialogComponent,
        IzvestajDialogComponent,
        PorudzbinaDialogComponent,
        ProizvodDialogComponent,
        ProizvodjacDialogComponent,
        RacunDialogComponent,
        VrstaProizvodaDialogComponent,
        ZaposleniDialogComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        ZaposleniGuard,
        AuthGuard,
        MenadzerGuard,
        AuthenticationService,
        DobavljacService,
        IzvestajService,
        KorisnikService,
        MenadzerService,
        PorudzbinaService,
        ProdavacService,
        ProizvodService,
        ProizvodjacService,
        RacunService,
        StavkaPorudzbineService,
        StavkaRacunaService,
        VrstaProizvodaService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };