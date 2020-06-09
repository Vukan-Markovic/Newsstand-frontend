import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Menadzer } from 'src/app/_models/menadzer';
import { IzvestajService } from 'src/app/_services/izvestaj.service';
import { MenadzerService } from 'src/app/_services/menadzer.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { IzvestajDO } from 'src/app/_models/izvestajDO';
import { Izvestaj } from 'src/app/_models/izvestaj';
import { RacunService } from 'src/app/_services/racun.service';

@Component({
  selector: 'app-izvestaj-dialog',
  templateUrl: './izvestaj-dialog.component.html',
  styleUrls: ['./izvestaj-dialog.component.css']
})
export class IzvestajDialogComponent implements OnInit {
  public flag: number;
  menadzeri: Menadzer[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<IzvestajDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IzvestajDO,
    public izvestajService: IzvestajService,
    public racunService: RacunService,
    public authenticationService: AuthenticationService,
    public menadzerService: MenadzerService) { }

  ngOnInit() {
    if (this.flag == 1) {
      this.racunService.getRacuni().subscribe(racuni => {
        if (!Array.isArray(racuni)) {
          this.snackBar.open("Da biste dodali novi izveštaj prethodno mora postajati bar jedan račun!", "U redu", {
            duration: 2000,
          });
          this.dialogRef.close();
          return;
        }

        this.menadzerService.getMenadzer(this.authenticationService.currentUserValue.korisnikID).subscribe(
          menadzer => this.data.menadzerID = menadzer[0].menadzerID, error => this.showError(error));
      });
    }
  }

  compareTo(a: Izvestaj, b: Izvestaj) {
    return a && b ? a.izvestajID === b.izvestajID : a === b;
  }

  public add() {
    if (this.data.datumOd > this.data.datumDo) {
      this.snackBar.open("Datum od mora biti manji od datuma do!", "U redu", {
        duration: 2000,
        panelClass: ['red-snackbar']
      });
      return;
    }

    var d1 = new Date(this.data.datumDo);
    var d2 = new Date(this.data.datumOd);
    d1.setHours(12, 0, 0);
    d2.setHours(12, 0, 0);
    this.data.datumDo = d1;
    this.data.datumOd = d2;

    this.izvestajService.addIzvestaj(this.data).subscribe(
      data => this.showSuccess(data), error => this.showError(error));
  }

  public delete() {
    this.izvestajService.deleteIzvestaj(this.data.izvestajID).subscribe(
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