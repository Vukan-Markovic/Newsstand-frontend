import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Korisnik } from 'src/app/_models/korisnik';
import { KorisnikService } from 'src/app/_services/korisnik.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DobavljacDialogComponent } from '../dialogs/dobavljac-dialog/dobavljac-dialog.component';

@Component({
  selector: 'app-korisnik',
  templateUrl: './korisnik.component.html'
})
export class KorisnikComponent implements OnInit {
  korisnik: Korisnik;
  userForm: FormGroup;
  message: string = "";
  enabled: boolean;
  isEnabled: boolean;

  constructor(private korisnikService: KorisnikService, private router: Router, 
    private authService: AuthenticationService) { }

  ngOnInit() {

    this.userForm = new FormGroup({
      email: new FormControl(null, Validators.email)
    });
  }

  onSubmit() {}

  // public openDialog(flag: number, prodavacID: number,
  //   ime: string,
  //   prezime: string,
  //   pol: string,
  //   datumRodjenja: string,
  //   adresaStanovanja: string,
  //   telefon: string,
  //   JMBG: string,
  //   datumZaposlenja: string,
  //   strucnaSprema: string) {
  //   const dialogRef = this.dialog.open(ProdavacDialogComponent, {
  //     data: {
  //       i: prodavacID, prodavacID: prodavacID, ime: ime, prezime: prezime, pol: pol,
  //       datumRodjenja: datumRodjenja, adresaStanovanja: adresaStanovanja, telefon: telefon, JMBG: JMBG
  //       , datumZaposlenja: datumZaposlenja, strucnaSprema: strucnaSprema
  //     }
  //   });

  //   dialogRef.componentInstance.flag = flag;

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result == 1)
  //       this.loadData();
  //   });
  // }

  // public openDialog(flag: number, dobavljacID?: number,
  //   skraceniNaziv?: string,
  //   punNaziv?: string,
  //   kontaktDobavljaca?: string,
  //   adresaDobavljaca?: string,
  //   grad?: string,
  //   drzava?: string,
  //   postanskiBroj?: string,
  //   PIB?: number,
  //   kontaktOsoba?: number,
  //   brojZiroRacuna?: string) {
  //   const dialogRef = this.dialog.open(DobavljacDialogComponent, {
  //     data: {
  //       i: dobavljacID, dobavljacID: dobavljacID, skraceniNaziv: skraceniNaziv, punNaziv: punNaziv, kontaktDobavljaca: kontaktDobavljaca,
  //       adresaDobavljaca: adresaDobavljaca, grad: grad, drzava: drzava, postanskiBroj: postanskiBroj, PIB: PIB,
  //       kontaktOsoba: kontaktOsoba, brojZiroRacuna: brojZiroRacuna
  //     }
  //   });
  //   dialogRef.componentInstance.flag = flag;

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result == 1)
  //       this.loadData();
  //   });
  // }
}