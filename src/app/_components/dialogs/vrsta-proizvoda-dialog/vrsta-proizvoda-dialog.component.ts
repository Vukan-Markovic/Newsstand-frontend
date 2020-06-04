import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VrstaProizvoda } from 'src/app/_models/vrstaProizvoda';
import { VrstaProizvodaService } from 'src/app/_services/vrstaProizvoda.service';

@Component({
  selector: 'app-vrsta-proizvoda-dialog',
  templateUrl: './vrsta-proizvoda-dialog.component.html',
  styleUrls: ['./vrsta-proizvoda-dialog.component.css']
})
export class VrstaProizvodaDialogComponent implements OnInit {
  public flag: number;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<VrstaProizvodaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VrstaProizvoda,
    public vrstaProizvodaService: VrstaProizvodaService) { }

  ngOnInit() { }

  public add(): void {
    this.vrstaProizvodaService.addVrstaProizvoda(this.data).subscribe(data => {
      this.showSuccess(data);
    },
      error => {
        this.showError(error);
      });
  }

  public update(): void {
    this.vrstaProizvodaService.updateVrstaProizvoda(this.data.vrstaProizvodaID, this.data).subscribe(data => {
      this.showSuccess(data);
    },
      error => {
        this.showError(error);
      });
  }

  public delete(): void {
    this.vrstaProizvodaService.deleteVrstaProizvoda(this.data.vrstaProizvodaID).subscribe(data => {
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