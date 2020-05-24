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
    this.data.proizvodjacID = -1;
    this.proizvodjacService.addProizvodjac(this.data);
    this.snackBar.open("Uspešno dodat proizvođač", "U redu", {
      duration: 2500,
    });
  }

  public update(): void {
    this.proizvodjacService.updateProizvodjac(this.data);
    this.snackBar.open("Uspešno modifikovan proizvođač", "U redu", {
      duration: 2500,
    });
  }

  public delete(): void {
    this.proizvodjacService.deleteProizvodjac(this.data.proizvodjacID);
    this.snackBar.open("Uspešno obrisan proizvođač", "U redu", {
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