import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Prodavac } from 'src/app/_models/prodavac';
import { ProdavacService } from 'src/app/_services/prodavac.service';

@Component({
  selector: 'app-prodavac-dialog',
  templateUrl: './prodavac-dialog.component.html',
  styleUrls: ['./prodavac-dialog.component.css']
})
export class ProdavacDialogComponent implements OnInit {
  public flag: number;

  ngOnInit() { }

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProdavacDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Prodavac,
    public prodavacService: ProdavacService) { }

  public update(): void {
    this.prodavacService.updateProdavac(this.data);
    this.snackBar.open("Uspešno modifikovan prodavac", "U redu", {
      duration: 2500,
    });
  }

  public delete(): void {
    this.prodavacService.deleteProdavac(this.data.prodavacID);
    this.snackBar.open("Uspešno obrisan prodavac", "U redu", {
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