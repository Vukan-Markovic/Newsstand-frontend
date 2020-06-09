import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Prodavac } from 'src/app/_models/prodavac';
import { ProdavacDO } from 'src/app/_models/prodavacDO';
import { Racun } from 'src/app/_models/racun';
import { RacunDO } from 'src/app/_models/racunDO';
import { ProdavacService } from 'src/app/_services/prodavac.service';
import { RacunService } from 'src/app/_services/racun.service';

@Component({
  selector: 'app-racun-dialog',
  templateUrl: './racun-dialog.component.html',
  styleUrls: ['./racun-dialog.component.css'],
})
export class RacunDialogComponent implements OnInit {
  public flag: number;
  racun: RacunDO = new RacunDO();
  prodavci: ProdavacDO[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RacunDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Racun,
    public racunService: RacunService,
    public prodavacService: ProdavacService) { }

  ngOnInit() {
    this.prodavacService.getProdavci().subscribe(prodavci => {
      this.prodavci = prodavci;
    }, error => this.showError(error));
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

  public add() {
    this.setRacun();
    this.racunService.addRacun(this.racun).subscribe(
      data => this.showSuccess(data), error => this.showError(error));
  }

  public update() {
    this.setRacun();
    this.racunService.updateRacun(this.data.racunID, this.racun).subscribe(
      data => this.showSuccess(data), error => this.showError(error));
  }

  public delete() {
    this.racunService.deleteRacun(this.data.racunID).subscribe(
      data => this.showSuccess(data), error => this.showError(error));
  }

  public cancel() {
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
    d1.setHours(d1.getHours() + 1);
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