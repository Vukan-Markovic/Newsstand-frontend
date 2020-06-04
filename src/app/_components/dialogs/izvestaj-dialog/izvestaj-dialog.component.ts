import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Menadzer } from 'src/app/_models/menadzer';
import { IzvestajService } from 'src/app/_services/izvestaj.service';
import { MenadzerService } from 'src/app/_services/menadzer.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { IzvestajDO } from 'src/app/_models/izvestajDO';
import { Izvestaj } from 'src/app/_models/izvestaj';

@Component({
  selector: 'app-izvestaj-dialog',
  templateUrl: './izvestaj-dialog.component.html',
  styleUrls: ['./izvestaj-dialog.component.css']
})
export class IzvestajDialogComponent implements OnInit {
  public flag: number;
  izvestaj: IzvestajDO = new IzvestajDO();
  menadzeri: Menadzer[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<IzvestajDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Izvestaj,
    public izvestajService: IzvestajService, 
    public authenticationService: AuthenticationService,
    public menadzerService: MenadzerService) { }

  ngOnInit() {
    this.menadzerService.getMenadzeri().subscribe(menadzeri =>
      this.menadzeri = menadzeri
    );
  }

  compareTo(a: Izvestaj, b: Izvestaj) {
    return a && b ? a.izvestajID === b.izvestajID : a === b;
  }

  onChange(menadzer: Menadzer) {
    this.data.menadzer = menadzer;
    this.izvestaj.menadzerID = menadzer.menadzerID;
  }

  public add(): void {
    this.setIzvestaj();
    this.izvestajService.addIzvestaj(this.izvestaj).subscribe(data => {
      this.showSuccess(data);
    },
      error => {
        this.showError(error);
      });
  }

  public update(): void {
    this.setIzvestaj();
    this.izvestajService.updateIzvestaj(this.data.izvestajID, this.izvestaj).subscribe(data => {
      this.showSuccess(data);
    },
      error => {
        this.showError(error);
      });
  }

  public delete(): void {
    this.izvestajService.deleteIzvestaj(this.data.izvestajID).subscribe(data => {
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

  setIzvestaj() {
    var d1 = new Date(this.data.datumDo);
    var d2 = new Date(this.data.datumOd);
    d1.setHours(12, 0, 0);
    d2.setHours(12, 0, 0);
    this.izvestaj.datumDo = d1;
    this.izvestaj.datumOd = d2;
    this.izvestaj.izvestajID = this.data.izvestajID;
    this.izvestaj.menadzerID = this.data.menadzer.menadzerID;
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