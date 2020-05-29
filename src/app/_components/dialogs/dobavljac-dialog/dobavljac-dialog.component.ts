import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dobavljac } from 'src/app/_models/dobavljac';
import { DobavljacService } from 'src/app/_services/dobavljac.service';

@Component({
  selector: 'app-dobavljac-dialog',
  templateUrl: './dobavljac-dialog.component.html',
  styleUrls: ['./dobavljac-dialog.component.css']
})
export class DobavljacDialogComponent implements OnInit {
  public flag: number;

  ngOnInit() { }

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DobavljacDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Dobavljac,
    public dobavljacService: DobavljacService) { }

  public update(): void {
    this.dobavljacService.updateDobavljac(this.data.dobavljacID, this.data);
    this.snackBar.open("Uspešno modifikovan dobavljač", "U redu", {
      duration: 2500,
    });
  }

  public delete(): void {
    this.dobavljacService.deleteDobavljac(this.data.dobavljacID);
    this.snackBar.open("Uspešno obrisan dobavljač", "U redu", {
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