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
    this.izvestajService.addIzvestaj(this.izvestaj);
    this.snackBar.open("Uspešno dodat izveštaj", "U redu", {
      duration: 2500,
    });
  }

  public update(): void {
    this.setIzvestaj();
    this.izvestaj.datumOd = new Date(this.izvestaj.datumOd.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    this.izvestaj.datumDo = new Date(this.izvestaj.datumDo.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    this.izvestajService.updateIzvestaj(this.data.izvestajID, this.izvestaj);
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

  setIzvestaj() {
    this.izvestaj.brojKupovina = this.data.brojKupovina;
    this.izvestaj.datumDo = this.data.datumDo;
    this.izvestaj.datumOd = this.data.datumOd;
    this.izvestaj.izvestajID = this.data.izvestajID;
    this.izvestaj.menadzerID = this.data.menadzer.menadzerID;
    this.izvestaj.promet = this.data.promet;
  }
}