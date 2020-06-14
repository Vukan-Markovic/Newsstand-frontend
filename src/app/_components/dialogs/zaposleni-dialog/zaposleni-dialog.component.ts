import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Prodavac } from 'src/app/_models/prodavac';
import { ProdavacService } from 'src/app/_services/prodavac.service';
import { MenadzerService } from 'src/app/_services/menadzer.service';
import { KorisnikService } from 'src/app/_services/korisnik.service';
import { MenadzerDO } from 'src/app/_models/menadzerDO';
import { ProdavacDO } from 'src/app/_models/prodavacDO';

@Component({
  selector: 'app-zaposleni-dialog',
  templateUrl: './zaposleni-dialog.component.html',
  styleUrls: ['./zaposleni-dialog.component.css']
})
export class ZaposleniDialogComponent implements OnInit {
  public flag: number;
  menadzer: MenadzerDO = new MenadzerDO();
  prodavac: ProdavacDO = new ProdavacDO();

  ngOnInit() { }

  constructor(public snackBar: MatSnackBar, public dialogRef: MatDialogRef<ZaposleniDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Prodavac, public prodavacService: ProdavacService,
    public menadzerService: MenadzerService, public korisnikService: KorisnikService) { }

  public update() {
    if (this.data.datumRodjenja >= this.data.datumZaposlenja) {
      this.snackBar.open("Datum rođenja mora biti pre datume zaposlenja!", "U redu", {
        duration: 2000,
        panelClass: ['red-snackbar']
      });
      return;
    }

    var d1 = new Date(this.data.datumRodjenja);
    var d2 = new Date(this.data.datumZaposlenja);
    d1.setHours(12, 0, 0);
    d2.setHours(12, 0, 0);
    this.prodavac.datumRodjenja = d1;
    this.prodavac.datumZaposlenja = d2;
    this.prodavac.JMBG = this.data.JMBG;
    this.prodavac.adresaStanovanja = this.data.adresaStanovanja;
    this.prodavac.ime = this.data.ime;
    this.prodavac.pol = this.data.pol;
    this.prodavac.prezime = this.data.prezime;
    this.prodavac.prodavacID = this.data.prodavacID;
    this.prodavac.strucnaSprema = this.data.strucnaSprema;
    this.prodavac.telefon = this.data.telefon;

    this.prodavacService.updateProdavac(this.data.prodavacID, this.prodavac).subscribe(data => {
      this.showSuccess(data);
      if (this.data.menadzer) {
        this.menadzer.adresaKancelarije = this.data.menadzer.adresaKancelarije;
        this.menadzer.brojKancelarije = this.data.menadzer.brojKancelarije;
        this.menadzer.menadzerID = this.data.menadzer.menadzerID;

        this.menadzerService.updateMenadzer(this.data.prodavacID, this.menadzer).subscribe(d => {
        }, error => this.showError(error));
      }
    }, error => this.showError(error));
  }

  public delete() {
    if (this.data.menadzer) {
      this.menadzerService.deleteMenadzer(this.data.prodavacID).subscribe(
        d => this.deleteProdavac(), error => this.showDeleteError());
    }
    else this.deleteProdavac();
  }

  public deleteProdavac() {
    this.prodavacService.deleteProdavac(this.data.prodavacID).subscribe(data => {
      this.korisnikService.deleteKorisnik(this.data.prodavacID).subscribe(
        d => {
          this.showSuccess(data);
          this.dialogRef.close(1);
        }, error => this.showDeleteError());
    }, error => this.showDeleteError());
  }

  public cancel() {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", "U redu", {
      duration: 1000,
    });
  }

  showDeleteError() {
    this.snackBar.open("Ne možete izbrisati nalog dok imate kreirane porudžbine!", "U redu", {
      duration: 2000,
      panelClass: ['red-snackbar']
    });

    this.dialogRef.close(-1);
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