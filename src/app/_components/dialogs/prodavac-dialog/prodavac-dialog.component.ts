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

  constructor(public snackBar: MatSnackBar, public dialogRef: MatDialogRef<ProdavacDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Prodavac, public prodavacService: ProdavacService) { }

  public update() {
    this.prodavacService.updateProdavac(this.data.prodavacID, this.data).subscribe(data => {
      this.showSuccess(data);
    }, error => {
      this.showError(error);
    });
  }

  public delete() {
    this.prodavacService.deleteProdavac(this.data.prodavacID).subscribe(data => {
      this.showSuccess(data);
    }, error => {
      this.showError(error);
    });
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