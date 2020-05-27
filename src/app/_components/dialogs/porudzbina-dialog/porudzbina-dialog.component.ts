import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dobavljac } from 'src/app/_models/dobavljac';
import { Menadzer } from 'src/app/_models/menadzer';
import { Prodavac } from 'src/app/_models/prodavac';
import { Porudzbina } from 'src/app/_models/porudzbina';
import { PorudzbinaService } from 'src/app/_services/porudzbina.service';
import { DobavljacService } from 'src/app/_services/dobavljac.service';
import { MenadzerService } from 'src/app/_services/menadzer.service';
import { ProdavacService } from 'src/app/_services/prodavac.service';

@Component({
  selector: 'app-porudzbina-dialog',
  templateUrl: './porudzbina-dialog.component.html',
  styleUrls: ['./porudzbina-dialog.component.css']
})
export class PorudzbinaDialogComponent implements OnInit {
  public flag: number;
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

  compareTo(a: { id: any; }, b: { id: any; }) {
    return a.id == b.id;
  }

  onChange(dobavljac: Dobavljac, menadzer: Menadzer, prodavac: Prodavac) {
    this.data.dobavljac = dobavljac;
    this.data.menadzer = menadzer;
    this.data.prodavac = prodavac;
  }

  public add(): void {
    this.data.porudzbinaID = -1;
    this.porudzbinaService.addPorudzbina(this.data);
    this.snackBar.open("Uspešno dodata porudžbina", "U redu", {
      duration: 2500,
    });
  }

  public update(): void {
    this.porudzbinaService.updatePorudzbina(this.data);
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
}