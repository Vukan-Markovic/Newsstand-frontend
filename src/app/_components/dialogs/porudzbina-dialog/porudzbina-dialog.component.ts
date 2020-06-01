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
    this.dobavljacService.getDobavljaci().subscribe(dobavljaci =>
      this.dobavljaci = dobavljaci
    );

    this.menadzerService.getMenadzeri().subscribe(menadzeri =>
      this.menadzeri = menadzeri
    );

    this.prodavacService.getProdavci().subscribe(prodavci =>
      this.prodavci = prodavci
    );
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
    this.porudzbinaService.addPorudzbina(this.porudzbina);
    this.snackBar.open("Uspešno dodata porudžbina", "U redu", {
      duration: 2500,
    });
  }

  public update(): void {
    this.setPorudzbina();
    this.porudzbina.datumIsporuke = new Date(this.porudzbina.datumIsporuke.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    this.porudzbina.datumPorucivanja = new Date(this.porudzbina.datumPorucivanja.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    this.porudzbinaService.updatePorudzbina(this.data.porudzbinaID, this.porudzbina);
    this.snackBar.open("Uspešno modifikovana porudžbina", "U redu", {
      duration: 2500,
    });
  }

  public delete(): void {
    this.porudzbinaService.deletePorudzbina(this.data.porudzbinaID);
    this.snackBar.open("Uspešno obrisana porudžbina", "U redu", {
      duration: 2500,
    });
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", "U redu", {
      duration: 1000,
    });
  }

  setPorudzbina() {
    this.porudzbina.datumIsporuke = this.data.datumIsporuke;
    this.porudzbina.datumPorucivanja = this.data.datumPorucivanja;
    this.porudzbina.dobavljacID = this.data.dobavljac.dobavljacID;
    this.porudzbina.menadzerID = this.data.menadzer.menadzerID;
    this.porudzbina.porudzbinaID = this.data.porudzbinaID;
    this.porudzbina.prodavacID = this.data.prodavac.prodavacID;
    this.porudzbina.statusPorudzbine = this.data.statusPorudzbine;
    this.porudzbina.ukupanIznosPorudzbine = this.data.ukupanIznosPorudzbine;
  }
}