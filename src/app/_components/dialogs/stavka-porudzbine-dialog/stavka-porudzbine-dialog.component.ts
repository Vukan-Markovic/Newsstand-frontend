import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StavkaPorudzbineService } from 'src/app/_services/stavkaPorudzbine.service';
import { ProizvodService } from 'src/app/_services/proizvod.service';
import { StavkaPorudzbine } from 'src/app/_models/stavkaPorudzbine';
import { ProizvodDO } from 'src/app/_models/proizvodDO';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-stavka-porudzbine-dialog',
  templateUrl: './stavka-porudzbine-dialog.component.html',
  styleUrls: ['./stavka-porudzbine-dialog.component.css']
})
export class StavkaPorudzbineDialogComponent implements OnInit {
  public flag: number;
  proizvodi: ProizvodDO[];
  proizvodDO: ProizvodDO = new ProizvodDO();
  kolicina = new FormControl('', [Validators.min(1), Validators.max(2147483647)]);

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<StavkaPorudzbineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StavkaPorudzbine,
    public proizvodService: ProizvodService,
    public stavkaPorudzbineService: StavkaPorudzbineService) { }

  ngOnInit() {
    this.proizvodService.getProizvodi().subscribe(proizvodi => {
      this.proizvodi = proizvodi;

      if (!Array.isArray(this.proizvodi)) {
        this.snackBar.open("Da biste dodali novu stavku porudžbine prethodno mora postajati bar jedan proizvod!", "U redu", {
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

  public add() {
    this.data.proizvodID = this.proizvodDO.proizvodID;
    this.stavkaPorudzbineService.addStavkaPorudzbine(this.data).subscribe(
      data => this.showSuccess(data), error => this.showError(error));
  }

  public delete() {
    this.stavkaPorudzbineService.deleteStavkaPorudzbine(this.data.porudzbinaID, this.data.proizvodID).subscribe(
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