import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DobavljacDialogComponent } from '../dialogs/dobavljac-dialog/dobavljac-dialog.component';
import { ZaposleniDialogComponent } from '../dialogs/zaposleni-dialog/zaposleni-dialog.component';
import { DobavljacService } from 'src/app/_services/dobavljac.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProdavacService } from 'src/app/_services/prodavac.service';
import { MenadzerService } from 'src/app/_services/menadzer.service';
import { Dobavljac } from 'src/app/_models/dobavljac';
import { Prodavac } from 'src/app/_models/prodavac';

@Component({
  selector: 'app-korisnik',
  templateUrl: './korisnik.component.html'
})
export class KorisnikComponent implements OnInit {
  dobavljac: Dobavljac = new Dobavljac();
  prodavac: Prodavac = new Prodavac();
  uloga: String;
  id: number;

  constructor(private authenticationService: AuthenticationService, public dobavljacService: DobavljacService, public dialog: MatDialog,
    public snackBar: MatSnackBar, public prodavacService: ProdavacService, public menadzerService: MenadzerService, private router: Router) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.uloga = this.authenticationService.currentUserValue.uloga;
    this.id = this.authenticationService.currentUserValue.korisnikID;

    if (this.uloga == 'prodavac' || this.uloga == 'menadžer') {
      this.prodavacService.getProdavac(this.id).subscribe(prodavac => {
        this.prodavac.JMBG = prodavac[0].JMBG;
        this.prodavac.adresaStanovanja = prodavac[0].adresaStanovanja;
        this.prodavac.datumRodjenja = prodavac[0].datumRodjenja;
        this.prodavac.datumZaposlenja = prodavac[0].datumZaposlenja;
        this.prodavac.ime = prodavac[0].ime;
        this.prodavac.pol = prodavac[0].pol;
        this.prodavac.prezime = prodavac[0].prezime;
        this.prodavac.prodavacID = prodavac[0].prodavacID;
        this.prodavac.strucnaSprema = prodavac[0].strucnaSprema;
        this.prodavac.telefon = prodavac[0].telefon;

        if (this.uloga == 'menadžer') {
          this.menadzerService.getMenadzer(this.id).subscribe(
            menadzer => this.prodavac.menadzer = menadzer[0], error => this.showError(error))
        }
      }, error => this.showError(error));
    } else {
      this.dobavljacService.getDobavljac(this.id).subscribe(
        dobavljac => this.dobavljac = dobavljac[0], error => this.showError(error));
    }
  }

  public openDialog(flag: number) {
    var dialogRef;

    if (this.uloga == 'prodavac' || this.uloga == 'menadžer') {
      dialogRef = this.dialog.open(ZaposleniDialogComponent, {
        data: {
          i: this.prodavac.prodavacID, prodavacID: this.prodavac.prodavacID, ime: this.prodavac.ime, prezime: this.prodavac.prezime, pol: this.prodavac.pol,
          datumRodjenja: this.prodavac.datumRodjenja, adresaStanovanja: this.prodavac.adresaStanovanja, telefon: this.prodavac.telefon, JMBG: this.prodavac.JMBG
          , datumZaposlenja: this.prodavac.datumZaposlenja, strucnaSprema: this.prodavac.strucnaSprema, menadzer: this.prodavac.menadzer
        }
      });
    }
    else {
      dialogRef = this.dialog.open(DobavljacDialogComponent, {
        data: {
          i: this.dobavljac.dobavljacID, dobavljacID: this.dobavljac.dobavljacID, skraceniNaziv: this.dobavljac.skraceniNaziv, punNaziv: this.dobavljac.punNaziv, kontaktDobavljaca: this.dobavljac.kontaktDobavljaca,
          adresaDobavljaca: this.dobavljac.adresaDobavljaca, grad: this.dobavljac.grad, drzava: this.dobavljac.drzava, postanskiBroj: this.dobavljac.postanskiBroj, PIB: this.dobavljac.PIB,
          kontaktOsoba: this.dobavljac.kontaktOsoba, brojZiroRacuna: this.dobavljac.brojZiroRacuna
        }
      });
    }

    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        if (flag == 2) this.loadData();
        else if (flag == 3) {
          this.authenticationService.logout();
          this.router.navigate(['/login']);
        }
      }
    });
  }

  showError(error) {
    this.snackBar.open(error, "U redu", {
      duration: 2000,
      panelClass: ['red-snackbar']
    });
  }
}