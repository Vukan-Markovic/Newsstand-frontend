import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dobavljac } from 'src/app/_models/dobavljac';
import { Menadzer } from 'src/app/_models/menadzer';
import { Prodavac } from 'src/app/_models/prodavac';
import { PorudzbinaDO } from 'src/app/_models/porudzbinaDO';
import { PorudzbinaService } from 'src/app/_services/porudzbina.service';
import { DobavljacService } from 'src/app/_services/dobavljac.service';
import { MenadzerService } from 'src/app/_services/menadzer.service';
import { ProdavacService } from 'src/app/_services/prodavac.service';
import { Porudzbina } from 'src/app/_models/porudzbina';
import { ProdavacDO } from 'src/app/_models/prodavacDO';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-porudzbina-dialog',
  templateUrl: './porudzbina-dialog.component.html',
  styleUrls: ['./porudzbina-dialog.component.css']
})
export class PorudzbinaDialogComponent implements OnInit {
  public flag: number;
  porudzbina: PorudzbinaDO = new PorudzbinaDO();
  dobavljaci: Dobavljac[];
  menadzeri: Menadzer[];
  prodavci: ProdavacDO[];
  i: number = 0;
  k: number = 0;
  loaded = false;
  isMenadzer = false;

  constructor(public snackBar: MatSnackBar, public authenticationService: AuthenticationService,
    public dialogRef: MatDialogRef<PorudzbinaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Porudzbina,
    public porudzbinaService: PorudzbinaService,
    public dobavljacService: DobavljacService,
    public menadzerService: MenadzerService,
    public prodavacService: ProdavacService) { }

  ngOnInit() {
    this.loaded = false;
    if (this.authenticationService.currentUserValue.uloga == 'menadžer') this.isMenadzer = true;

    this.dobavljacService.getDobavljaci().subscribe(dobavljaci => {
      if (!Array.isArray(dobavljaci)) {
        this.exit();
        return;
      }

      this.dobavljaci = dobavljaci;

      this.prodavacService.getProdavci().subscribe(prodavci => {
        if (!Array.isArray(prodavci)) {
          this.exit();
          return;
        }

        this.prodavci = prodavci;

        this.menadzerService.getMenadzeri().subscribe(data => {
          if (!Array.isArray(data)) {
            this.exit();
            return;
          }
          this.k = data.length;
          this.menadzeri = [];

          data.forEach(element => {
            var menadzer = new Menadzer();
            menadzer.menadzerID = element.menadzerID;
            menadzer.adresaKancelarije = element.adresaKancelarije;
            menadzer.brojKancelarije = element.brojKancelarije;
            this.menadzeri.push(menadzer);

            this.prodavacService.getProdavac(element.menadzerID).subscribe(prodavac => {
              this.menadzeri[this.i++].prodavac = prodavac[0];
              if (this.k == this.i) this.loaded = true;
            }, error => this.showError(error));
          });
        }, error => this.showError(error));
      }, error => this.showError(error));
    }, error => this.showError(error));
  }

  isArray() {
    if (!Array.isArray(this.menadzeri) || !Array.isArray(this.dobavljaci) || !Array.isArray(this.prodavci))
      return false;
    return true;
  }

  compareProdavac(a: Prodavac, b: Prodavac) {
    return a && b ? a.prodavacID === b.prodavacID : a === b;
  }

  compareDobavljac(a: Dobavljac, b: Dobavljac) {
    return a && b ? a.dobavljacID === b.dobavljacID : a === b;
  }

  compareMenadzer(a: Menadzer, b: Menadzer) {
    return a && b ? a.menadzerID === b.menadzerID : a === b;
  }

  onChange(dobavljac: Dobavljac, menadzer: Menadzer, prodavac: Prodavac) {
    this.data.dobavljac = dobavljac;
    this.data.menadzer = menadzer;
    this.data.prodavac = prodavac;
    this.porudzbina.dobavljacID = dobavljac.dobavljacID;
    this.porudzbina.menadzerID = menadzer.menadzerID;
    this.porudzbina.prodavacID = prodavac.prodavacID;
  }

  public add() {
    if (this.checkDates) {
      this.setPorudzbina();
      this.porudzbinaService.addPorudzbina(this.porudzbina).subscribe(
        data => this.showSuccess(data), error => this.showError(error));
    }
  }

  public update() {
    if (this.checkDates) {
      this.setPorudzbina();
      this.porudzbinaService.updatePorudzbina(this.data.porudzbinaID, this.porudzbina).subscribe(
        data => this.showSuccess(data), error => this.showError(error));
    }
  }

  public delete() {
    this.porudzbinaService.deletePorudzbina(this.data.porudzbinaID).subscribe(
      data => this.showSuccess(data), error => this.showError(error));
  }

  public cancel() {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", "U redu", {
      duration: 1000,
    });
  }

  checkDates() {
    if (this.data.datumIsporuke && (this.data.datumIsporuke < this.data.datumPorucivanja)) {
      this.snackBar.open("Datum isporuke mora biti pre ili na dan datuma poručivanja!", "U redu", {
        duration: 2000,
        panelClass: ['red-snackbar']
      });
      return false;
    }
    return true;
  }

  exit() {
    this.snackBar.open("Da biste dodali novu porudžbinu prethodno mora postajati bar jedan menadžer, dobavljač i prodavac!", "U redu", {
      duration: 2000,
    });
    this.dialogRef.close();
  }

  setPorudzbina() {
    if (this.data.datumIsporuke) {
      var d1 = new Date(this.data.datumIsporuke);
      d1.setHours(12, 0, 0);
      this.porudzbina.datumIsporuke = d1;
    }

    var d2 = new Date(this.data.datumPorucivanja);
    d2.setHours(12, 0, 0);
    this.porudzbina.datumPorucivanja = d2;
    this.porudzbina.dobavljacID = this.data.dobavljac.dobavljacID;
    this.porudzbina.menadzerID = this.data.menadzer.menadzerID;
    this.porudzbina.porudzbinaID = this.data.porudzbinaID;
    this.porudzbina.prodavacID = this.data.prodavac.prodavacID;
    this.porudzbina.statusPorudzbine = this.data.statusPorudzbine;
    this.porudzbina.ukupanIznosPorudzbine = this.data.ukupanIznosPorudzbine;
  }

  showError(error) {
    this.snackBar.open(error, "U redu", {
      duration: 2000,
      panelClass: ['red-snackbar']
    });
  }

  showSuccess(data) {
    this.snackBar.open(data['message'], "U redu", {
      duration: 2500,
    });
  }
}