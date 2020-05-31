import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProdavacService } from 'src/app/_services/prodavac.service';
import { RacunService } from 'src/app/_services/racun.service';
import { Prodavac } from 'src/app/_models/prodavac';
import { RacunDO } from 'src/app/_models/racunDO';
import { Racun } from 'src/app/_models/racun';
// import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
// import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-racun-dialog',
  templateUrl: './racun-dialog.component.html',
  styleUrls: ['./racun-dialog.component.css'],
  // providers: [
  //   { provide: MAT_DATE_LOCALE, useValue: 'ja-JP' },
  //   { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
  //   { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  //   { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { strict: true } }
  // ],
})
export class RacunDialogComponent implements OnInit {
  public flag: number;
  racun: RacunDO = new RacunDO();
  prodavci: Prodavac[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RacunDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Racun,
    public racunService: RacunService, 
    // private _adapter: DateAdapter<any>,
    public prodavacService: ProdavacService) { }

  ngOnInit() {
    // this._adapter.setLocale('en-GB');

    this.prodavacService.getProdavci().subscribe(prodavci => {
      this.prodavci = prodavci;
    });
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
    console.log(this.racun.vremeIzdavanja);
    this.racunService.addRacun(this.racun);
    this.snackBar.open("Uspešno dodat račun", "U redu", {
      duration: 2500,
    });
  }

  public update(): void {
    this.setRacun();
    this.racun.vremeIzdavanja = new Date(this.racun.vremeIzdavanja.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    this.racunService.updateRacun(this.data.racunID, this.racun);
    this.snackBar.open("Uspešno modifikovan račun", "U redu", {
      duration: 2500,
    });
  }

  public delete(): void {
    this.racunService.deleteRacun(this.data.racunID);
    this.snackBar.open("Uspešno obrisan račun", "U redu", {
      duration: 2500,
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
    this.racun.vremeIzdavanja = this.data.vremeIzdavanja;
  }
}