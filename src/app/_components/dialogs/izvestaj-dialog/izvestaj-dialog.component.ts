import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Menadzer } from 'src/app/_models/menadzer';
import { IzvestajService } from 'src/app/_services/izvestaj.service';
import { MenadzerService } from 'src/app/_services/menadzer.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { IzvestajDO } from 'src/app/_models/izvestajDO';

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
    public authenticationService: AuthenticationService,
    public menadzerService: MenadzerService) { }

  ngOnInit() {
    this.menadzerService.getMenadzeri().subscribe(menadzeri =>
      this.menadzeri = menadzeri
    );
  }

  // compareTo(a: { id: any; }, b: { id: any; }) {
  //   return a.id == b.id;
  // }

  // onChange(menadzer: Menadzer) {
  //   this.data.menadzerID = menadzer.menadzerID;
  // }

  // public add(): void {
  //   this.izvestajService.addIzvestaj(this.data);
  //   this.snackBar.open("Uspešno dodat izveštaj", "U redu", {
  //     duration: 2500,
  //   });
  // }

  // public update(): void {
  //   this.izvestajService.updateIzvestaj(this.data.izvestajID, this.data);
  //   this.snackBar.open("Uspešno modifikovan izveštaj", "U redu", {
  //     duration: 2500,
  //   });
  // }

  // public delete(): void {
  //   this.izvestajService.deleteIzvestaj(this.data.izvestajID);
  //   this.snackBar.open("Uspešno obrisan izveštaj", "U redu", {
  //     duration: 2500,
  //   });
  // }

  // public cancel(): void {
  //   this.dialogRef.close();
  //   this.snackBar.open("Odustali ste", "U redu", {
  //     duration: 1000,
  //   });
  // }
}