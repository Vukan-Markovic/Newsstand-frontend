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
import { FormControl, Validators } from '@angular/forms';

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
  cena = new FormControl('', [Validators.min(1), Validators.max(99999999), Validators.required]);
  masa = new FormControl('', [Validators.min(1), Validators.max(99999999), Validators.required]);
  raspolozivaKolicina = new FormControl('', [Validators.min(1), Validators.max(2147483647), Validators.required]);

  constructor(public snackBar: MatSnackBar, public dialogRef: MatDialogRef<ProizvodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Proizvod, public proizvodService: ProizvodService,
    public proizvodjacService: ProizvodjacService, public vrstaProizvodaService: VrstaProizvodaService) { }

  ngOnInit() {
    if(this.flag==3) {
      this.cena.disable();
      this.masa.disable();
      this.raspolozivaKolicina.disable();
    }
    
    this.proizvodjacService.getProizvodjaci().subscribe(proizvodjaci => {
      this.proizvodjaci = proizvodjaci;

      this.vrstaProizvodaService.getVrsteProizvoda().subscribe(vrsteProizvoda => {
        this.vrsteProizvoda = vrsteProizvoda;

        if (!Array.isArray(this.proizvodjaci) || !Array.isArray(this.vrsteProizvoda)) {
          this.snackBar.open("Da biste dodali novi proizvod prethodno mora postajati bar jedan proizvođač i vrsta proizvoda!", "U redu", {
            duration: 2000,
          });
          this.dialogRef.close();
        }
      }, error => this.showError(error));
    }, error => this.showError(error));
  }

  isArray() {
    if (!Array.isArray(this.proizvodjaci) || !Array.isArray(this.vrsteProizvoda)) return false;
    return true;
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

  public add() {
    this.setProizvod();
    this.proizvodService.addProizvod(this.proizvod).subscribe(
      data => this.showSuccess(data), error => this.showError(error));
  }

  public update() {
    this.setProizvod();
    this.proizvodService.updateProizvod(this.proizvod.proizvodID, this.proizvod).subscribe(
      data => this.showSuccess(data), error => this.showError(error));
  }

  public delete() {
    this.proizvodService.deleteProizvod(this.data.proizvodID).subscribe(
      data => this.showSuccess(data), error => this.showError(error));
  }

  public cancel() {
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