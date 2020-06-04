import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Proizvodjac } from 'src/app/_models/proizvodjac';
import { ProizvodjacService } from 'src/app/_services/proizvodjac.service';

@Component({
  selector: 'app-proizvodjac-dialog',
  templateUrl: './proizvodjac-dialog.component.html',
  styleUrls: ['./proizvodjac-dialog.component.css']
})
export class ProizvodjacDialogComponent implements OnInit {
  public flag: number;

  ngOnInit() { }

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProizvodjacDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Proizvodjac,
    public proizvodjacService: ProizvodjacService) { }

  public add(): void {
    this.proizvodjacService.addProizvodjac(this.data).subscribe(data => {
      this.showSuccess(data);
    },
      error => {
        this.showError(error);
      });
  }

  public update(): void {
    this.proizvodjacService.updateProizvodjac(this.data.proizvodjacID, this.data).subscribe(data => {
      this.showSuccess(data);
    },
      error => {
        this.showError(error);
      });
  }

  public delete(): void {
    this.proizvodjacService.deleteProizvodjac(this.data.proizvodjacID).subscribe(data => {
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