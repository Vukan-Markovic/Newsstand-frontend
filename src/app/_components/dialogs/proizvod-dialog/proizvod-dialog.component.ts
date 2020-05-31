import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Proizvodjac } from 'src/app/_models/proizvodjac';
import { VrstaProizvoda } from 'src/app/_models/vrstaProizvoda';
import { ProizvodService } from 'src/app/_services/proizvod.service';
import { ProizvodDO } from 'src/app/_models/proizvodDO';
import { ProizvodjacService } from 'src/app/_services/proizvodjac.service';
import { VrstaProizvodaService } from 'src/app/_services/vrstaProizvoda.service';
import { Proizvod } from 'src/app/_models/proizvod';

@Component({
  selector: 'app-proizvod-dialog',
  templateUrl: './proizvod-dialog.component.html',
  styleUrls: ['./proizvod-dialog.component.css']
})
export class ProizvodDialogComponent implements OnInit {
  public flag: number;
  proizvod: ProizvodDO = new ProizvodDO();
  proizvodjaci: Proizvodjac[];
  vrsteProizvoda: VrstaProizvoda[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProizvodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Proizvod,
    public proizvodService: ProizvodService,
    public proizvodjacService: ProizvodjacService,
    public vrstaProizvodaService: VrstaProizvodaService) { }

  ngOnInit() {
    
    this.proizvodjacService.getProizvodjaci().subscribe(proizvodjaci =>
      this.proizvodjaci = proizvodjaci
    );

    this.vrstaProizvodaService.getVrsteProizvoda().subscribe(vrsteProizvoda =>
      this.vrsteProizvoda = vrsteProizvoda
    );
  }

  compareVrstaProizvoda(a: VrstaProizvoda, b: VrstaProizvoda) {
    return a && b ? a.vrstaProizvodaID === b.vrstaProizvodaID : a === b;
  }

  compareProizvodjac(a: Proizvodjac, b: Proizvodjac) {
    return a && b ? a.proizvodjacID === b.proizvodjacID : a === b;
  }


  onChange(proizvodjac: Proizvodjac, vrstaProizvoda: VrstaProizvoda) {
    this.data.proizvodjac = proizvodjac;
    this.data.vrstaProizvoda = vrstaProizvoda;
    this.proizvod.proizvodjacID = proizvodjac.proizvodjacID;
    this.proizvod.vrstaProizvodaID = vrstaProizvoda.vrstaProizvodaID;
  }

  public add(): void {
    this.setProizvod();
    this.proizvodService.addProizvod(this.proizvod);
    this.snackBar.open("Uspešno dodat proizvod", "U redu", {
      duration: 2500,
    });
  }

  public update(): void {
    this.setProizvod();
    this.proizvodService.updateProizvod(this.proizvod.proizvodID, this.proizvod);
    this.snackBar.open("Uspešno modifikovan proizvod", "U redu", {
      duration: 2500,
    });
  }

  public delete(): void {
    this.proizvodService.deleteProizvod(this.data.proizvodID);
    this.snackBar.open("Uspešno obrisan proizvod", "U redu", {
      duration: 2500,
    });
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", "U redu", {
      duration: 1000,
    });
  }

  setProizvod() {
    this.proizvod.barKod = this.data.barKod;
    this.proizvod.cena = this.data.cena;
    this.proizvod.masa = this.data.masa;
    this.proizvod.nazivProizvoda = this.data.nazivProizvoda;
    this.proizvod.opisProizvoda = this.data.opisProizvoda;
    this.proizvod.proizvodID = this.data.proizvodID;
    this.proizvod.proizvodjacID = this.data.proizvodjac.proizvodjacID;
    this.proizvod.raspolozivaKolicina = this.data.raspolozivaKolicina;
    this.proizvod.tipPakovanja = this.data.tipPakovanja;
    this.proizvod.velicinaPakovanja = this.data.velicinaPakovanja;
    this.proizvod.vrstaProizvodaID = this.data.vrstaProizvoda.vrstaProizvodaID;
  }
}