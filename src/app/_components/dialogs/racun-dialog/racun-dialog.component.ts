import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProdavacService } from 'src/app/_services/prodavac.service';
import { RacunService } from 'src/app/_services/racun.service';
import { Prodavac } from 'src/app/_models/prodavac';
import { RacunDO } from 'src/app/_models/racunDO';

@Component({
  selector: 'app-racun-dialog',
  templateUrl: './racun-dialog.component.html',
  styleUrls: ['./racun-dialog.component.css']
})
export class RacunDialogComponent implements OnInit {
  public flag: number;
  prodavac: Prodavac;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RacunDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RacunDO,
    public racunService: RacunService,
    public prodavacService: ProdavacService) { }

  ngOnInit() { }

  compareTo(a: { id: any; }, b: { id: any; }) {
    return a.id == b.id;
  }

  public add(): void {
    this.racunService.addRacun(this.data);
    this.snackBar.open("Uspešno dodat račun", "U redu", {
      duration: 2500,
    });
  }

  public update(): void {
    this.racunService.updateRacun(this.data.racunID, this.data);
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
}