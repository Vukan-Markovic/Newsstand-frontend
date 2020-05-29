import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './_components/home/home.component';
import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
// MatOptionModule
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DobavljacComponent } from './_components/dobavljac/dobavljac.component';
import { IzvestajComponent } from './_components/izvestaj/izvestaj.component';
import { PorudzbinaComponent } from './_components/porudzbina/porudzbina.component';
import { ProizvodComponent } from './_components/proizvod/proizvod.component';
import { ProdavacComponent } from './_components/prodavac/prodavac.component';
import { ProizvodjacComponent } from './_components/proizvodjac/proizvodjac.component';
import { RacunComponent } from './_components/racun/racun.component';
import { VrstaProizvodaComponent } from './_components/vrsta-proizvoda/vrsta-proizvoda.component';
import { PageNotFoundComponent } from './_components/page-not-found/page-not-found.component';
import { DobavljacDialogComponent } from './_components/dialogs/dobavljac-dialog/dobavljac-dialog.component';
import { IzvestajDialogComponent } from './_components/dialogs/izvestaj-dialog/izvestaj-dialog.component';
import { PorudzbinaDialogComponent } from './_components/dialogs/porudzbina-dialog/porudzbina-dialog.component';
import { ProizvodDialogComponent } from './_components/dialogs/proizvod-dialog/proizvod-dialog.component';
import { ProizvodjacDialogComponent } from './_components/dialogs/proizvodjac-dialog/proizvodjac-dialog.component';
import { RacunDialogComponent } from './_components/dialogs/racun-dialog/racun-dialog.component';
import { VrstaProizvodaDialogComponent } from './_components/dialogs/vrsta-proizvoda-dialog/vrsta-proizvoda-dialog.component';
import { KorisnikComponent } from './_components/korisnik/korisnik.component';
import { ProdavacDialogComponent } from './_components/dialogs/prodavac-dialog/prodavac-dialog.component';
import { MenadzerComponent } from './_components/menadzer/menadzer.component';
import { DobavljacService } from './_services/dobavljac.service';
import { IzvestajService } from './_services/izvestaj.service';
import { AuthenticationService } from './_services/authentication.service';
import { StavkaPorudzbineService } from './_services/stavkaPorudzbine.service';
import { PorudzbinaService } from './_services/porudzbina.service';
import { KorisnikService } from './_services/korisnik.service';
import { MenadzerService } from './_services/menadzer.service';
import { ProdavacService } from './_services/prodavac.service';
import { ProizvodService } from './_services/proizvod.service';
import { ProizvodjacService } from './_services/proizvodjac.service';
import { VrstaProizvodaService } from './_services/vrstaProizvoda.service';
import { RacunService } from './_services/racun.service';
import { StavkaRacunaService } from './_services/stavkaRacuna.service';
import { ResetPasswordComponent } from './_components/reset-password/reset-password.component';
import { EmailInputComponent } from './_components/email-input/email-input.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
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
        ToastrModule.forRoot({
            positionClass: 'toast-top-right',
            preventDuplicates: true,
            tapToDismiss: true
        }),
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
        ProdavacComponent,
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
        ProdavacDialogComponent,
        MenadzerComponent,
        ResetPasswordComponent,
        EmailInputComponent
    ],
    entryComponents: [
        DobavljacDialogComponent,
        IzvestajDialogComponent,
        PorudzbinaDialogComponent,
        ProizvodDialogComponent,
        ProizvodjacDialogComponent,
        RacunDialogComponent,
        VrstaProizvodaDialogComponent,
        ProdavacDialogComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
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