import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dobavljac } from 'src/app/_models/dobavljac';
import { Menadzer } from 'src/app/_models/menadzer';
import { Prodavac } from 'src/app/_models/prodavac';
import { PorudzbinaDO } from 'src/app/_models/porudzbinaDO';
import { PorudzbinaService } from 'src/app/_services/porudzbina.service';
import { DobavljacService } from 'src/app/_services/dobavljac.service';
import { MenadzerService } from 'src/app/_services/menadzer.service';
import { ProdavacService } from 'src/app/_services/prodavac.service';
import { Porudzbina } from 'src/app/_models/porudzbina';

@Component({
  selector: 'app-porudzbina-dialog',
  templateUrl: './porudzbina-dialog.component.html',
  styleUrls: ['./porudzbina-dialog.component.css']
})
export class PorudzbinaDialogComponent implements OnInit {
  public flag: number;
  porudzbina: PorudzbinaDO = new PorudzbinaDO();
  dobavljaci: Dobavljac[];
  menadzeri: Menadzer[];
  prodavci: Prodavac[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PorudzbinaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Porudzbina,
    public porudzbinaService: PorudzbinaService,
    public dobavljacService: DobavljacService,
    public menadzerService: MenadzerService,
    public prodavacService: ProdavacService) { }

  ngOnInit() {
    this.dobavljacService.getDobavljaci().subscribe(dobavljaci => {
      this.dobavljaci = dobavljaci;

      this.menadzerService.getMenadzeri().subscribe(menadzeri => {
        this.menadzeri = menadzeri;

        this.prodavacService.getProdavci().subscribe(prodavci => {
          this.prodavci = prodavci;
          if (!Array.isArray(this.menadzeri) || !Array.isArray(this.dobavljaci) || !Array.isArray(this.prodavci)) {
            this.snackBar.open("Da biste dodali novu porudžbinu prethodno mora postajati bar jedan menadžer, dobavljač i prodavac!", "U redu", {
              duration: 2000,
            });
            this.dialogRef.close();
          }
        });
      });
    });
  }

  isArray() {
    if (!Array.isArray(this.menadzeri) || !Array.isArray(this.dobavljaci) || !Array.isArray(this.prodavci))
      return false;
    return true;
  }

  compareProdavac(a: Prodavac, b: Prodavac) {
    return a && b ? a.prodavacID === b.prodavacID : a === b;
  }

  compareDobavljac(a: Dobavljac, b: Dobavljac) {
    return a && b ? a.dobavljacID === b.dobavljacID : a === b;
  }

  compareMenadzer(a: Menadzer, b: Menadzer) {
    return a && b ? a.menadzerID === b.menadzerID : a === b;
  }

  onChange(dobavljac: Dobavljac, menadzer: Menadzer, prodavac: Prodavac) {
    this.data.dobavljac = dobavljac;
    this.data.menadzer = menadzer;
    this.data.prodavac = prodavac;
    this.porudzbina.dobavljacID = dobavljac.dobavljacID;
    this.porudzbina.menadzerID = menadzer.menadzerID;
    this.porudzbina.prodavacID = prodavac.prodavacID;
  }

  public add(): void {
    this.setPorudzbina();
    this.porudzbinaService.addPorudzbina(this.porudzbina).subscribe(data => {
      this.showSuccess(data);
    },
      error => {
        this.showError(error);
      });
  }

  public update(): void {
    this.setPorudzbina();
    this.porudzbinaService.updatePorudzbina(this.data.porudzbinaID, this.porudzbina).subscribe(data => {
      this.showSuccess(data);
    },
      error => {
        this.showError(error);
      });
  }

  public delete(): void {
    this.porudzbinaService.deletePorudzbina(this.data.porudzbinaID).subscribe(data => {
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

  setPorudzbina() {
    if (this.data.datumIsporuke) {
      var d1 = new Date(this.data.datumIsporuke);
      d1.setHours(12, 0, 0);
      this.porudzbina.datumIsporuke = d1;
    }

    var d2 = new Date(this.data.datumPorucivanja);
    d2.setHours(12, 0, 0);
    this.porudzbina.datumPorucivanja = d2;
    this.porudzbina.dobavljacID = this.data.dobavljac.dobavljacID;
    this.porudzbina.menadzerID = this.data.menadzer.menadzerID;
    this.porudzbina.porudzbinaID = this.data.porudzbinaID;
    this.porudzbina.prodavacID = this.data.prodavac.prodavacID;
    this.porudzbina.statusPorudzbine = this.data.statusPorudzbine;
    this.porudzbina.ukupanIznosPorudzbine = this.data.ukupanIznosPorudzbine;
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