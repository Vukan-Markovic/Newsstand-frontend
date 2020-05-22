import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Menadzer } from 'src/app/_models/menadzer';
import { Izvestaj } from 'src/app/_models/izvestaj';
import { IzvestajService } from 'src/app/_services/izvestaj.service';
import { MenadzerService } from 'src/app/_services/menadzer.service';

@Component({
  selector: 'app-izvestaj-dialog',
  templateUrl: './izvestaj-dialog.component.html',
  styleUrls: ['./izvestaj-dialog.component.css']
})
export class IzvestajDialogComponent implements OnInit {
  public flag: number;
  menadzer: Menadzer;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<IzvestajDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Izvestaj,
    public izvestajService: IzvestajService,
    public menadzerService: MenadzerService) { }

  ngOnInit() {
    // this.menadzerService.getAllLiga().subscribe(lige =>
    //   this.lige = lige
    // );
  }

  compareTo(a: { id: any; }, b: { id: any; }) {
    return a.id == b.id;
  }

  public add(): void {
    this.data.izvestajID = -1;
    this.izvestajService.addIzvestaj(this.data);
    this.snackBar.open("Uspešno dodat izveštaj", "U redu", {
      duration: 2500,
    });
  }

  public update(): void {
    this.izvestajService.updateIzvestaj(this.data);
    this.snackBar.open("Uspešno modifikovan izveštaj", "U redu", {
      duration: 2500,
    });
  }

  public delete(): void {
    this.izvestajService.deleteIzvestaj(this.data.izvestajID);
    this.snackBar.open("Uspešno obrisan izveštaj", "U redu", {
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