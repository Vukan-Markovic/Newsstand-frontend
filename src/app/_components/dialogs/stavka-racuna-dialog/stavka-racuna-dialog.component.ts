import { Component, OnInit, Inject } from '@angular/core';
import { StavkaRacunaService } from 'src/app/_services/stavkaRacuna.service';
import { StavkaRacuna } from 'src/app/_models/stavkaRacuna';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProizvodService } from 'src/app/_services/proizvod.service';
import { ProizvodDO } from 'src/app/_models/proizvodDO';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-stavka-racuna-dialog',
  templateUrl: './stavka-racuna-dialog.component.html',
  styleUrls: ['./stavka-racuna-dialog.component.css']
})
export class StavkaRacunaDialogComponent implements OnInit {
  public flag: number;
  proizvodi: ProizvodDO[];
  proizvodDO: ProizvodDO = new ProizvodDO();
  kolicinaProizvoda = new FormControl('', [Validators.min(1), Validators.max(2147483647)]);

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<StavkaRacunaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StavkaRacuna,
    public proizvodService: ProizvodService,
    public stavkaRacunaService: StavkaRacunaService) { }

  ngOnInit() {
    this.proizvodService.getProizvodi().subscribe(proizvodi => {
      this.proizvodi = proizvodi;

      if (!Array.isArray(this.proizvodi)) {
        this.snackBar.open("Da biste dodali novu stavku računa prethodno mora postajati bar jedan proizvod!", "U redu", {
          duration: 2000,
        });
        this.dialogRef.close();
      }
    }, error => this.showError(error));
  }

  isArray() {
    if (!Array.isArray(this.proizvodi)) return false;
    return true;
  }

  compareTo(a: ProizvodDO, b: ProizvodDO) {
    return a && b ? a.proizvodID === b.proizvodID : a === b;
  }

  onChange(proizvod: ProizvodDO) {
    this.data.proizvodID = proizvod.proizvodID;
    this.proizvodDO = proizvod;
  }

  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }

  public add() {
    if (this.data.kolicinaProizvoda > this.proizvodDO.raspolozivaKolicina) {
      this.snackBar.open("Količina kupljenog proizvoda ne može biti veća od njegove dostupnosti!", "U redu", {
        duration: 2000,
        panelClass: ['red-snackbar']
      });
      return;
    }

    this.data.proizvodID = this.proizvodDO.proizvodID;
    this.stavkaRacunaService.addStavkaRacuna(this.data).subscribe(
      data => this.showSuccess(data), error => this.showError(error));
  }

  public delete() {
    this.stavkaRacunaService.deleteStavkaRacuna(this.data.racunID, this.data.proizvodID).subscribe(
      data => this.showSuccess(data), error => this.showError(error));
  }

  public cancel() {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", "U redu", {
      duration: 1000,
    });
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