import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProdavacService } from 'src/app/_services/prodavac.service';
import { RacunService } from 'src/app/_services/racun.service';
import { Prodavac } from 'src/app/_models/prodavac';
import { RacunDO } from 'src/app/_models/racunDO';
import { Racun } from 'src/app/_models/racun';

@Component({
  selector: 'app-racun-dialog',
  templateUrl: './racun-dialog.component.html',
  styleUrls: ['./racun-dialog.component.css'],
})
export class RacunDialogComponent implements OnInit {
  public flag: number;
  racun: RacunDO = new RacunDO();
  prodavci: Prodavac[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RacunDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Racun,
    public racunService: RacunService,
    public prodavacService: ProdavacService) { }

  ngOnInit() {
    this.prodavacService.getProdavci().subscribe(prodavci => {
      this.prodavci = prodavci;
      if (!Array.isArray(this.prodavci)) {
        this.snackBar.open("Da biste dodali novi račun prethodno mora postajati bar jedan zaposleni!", "U redu", {
          duration: 2000,
        });
        this.dialogRef.close();
      }
    });
  }

  isArray() {
    if (!Array.isArray(this.prodavci)) return false;
    return true;
  }

  compareTo(a: Prodavac, b: Prodavac) {
    return a && b ? a.prodavacID === b.prodavacID : a === b;
  }

  onChange(prodavac: Prodavac) {
    this.data.prodavac = prodavac;
    this.racun.prodavacID = prodavac.prodavacID;
  }

  public add(): void {
    this.setRacun();
    this.racunService.addRacun(this.racun).subscribe(data => {
      this.showSuccess(data);
    },
      error => {
        this.showError(error);
      });
  }

  public update(): void {
    this.setRacun();
    this.racunService.updateRacun(this.data.racunID, this.racun).subscribe(data => {
      this.showSuccess(data);
    },
      error => {
        this.showError(error);
      });
  }

  public delete(): void {
    this.racunService.deleteRacun(this.data.racunID).subscribe(data => {
      this.showSuccess(data);
    },
      error => {
        this.showError(error);
      });
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", "U redu", {
      duration: 1000,
    });
  }

  setRacun() {
    this.racun.brojRacuna = this.data.brojRacuna;
    this.racun.mestoIzdavanja = this.data.mestoIzdavanja;
    this.racun.nacinPlacanja = this.data.nacinPlacanja
    this.racun.nazivProdavnice = this.data.nazivProdavnice
    this.racun.prodavacID = this.data.prodavac.prodavacID;
    this.racun.racunID = this.data.racunID;
    this.racun.tipRacuna = this.data.tipRacuna;
    this.racun.ukupanIznosRacuna = this.data.ukupanIznosRacuna;
    var d1 = new Date(this.data.vremeIzdavanja);
    d1.setSeconds(0);
    d1.setHours(d1.getHours() + 2);
    this.racun.vremeIzdavanja = d1;
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