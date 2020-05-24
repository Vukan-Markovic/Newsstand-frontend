import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Proizvodjac } from 'src/app/_models/proizvodjac';
import { VrstaProizvoda } from 'src/app/_models/vrstaProizvoda';
import { ProizvodService } from 'src/app/_services/proizvod.service';
import { Proizvod } from 'src/app/_models/proizvod';
import { ProizvodjacService } from 'src/app/_services/proizvodjac.service';
import { VrstaProizvodaService } from 'src/app/_services/vrstaProizvoda.service';

@Component({
  selector: 'app-proizvod-dialog',
  templateUrl: './proizvod-dialog.component.html',
  styleUrls: ['./proizvod-dialog.component.css']
})
export class ProizvodDialogComponent implements OnInit {
  public flag: number;
  proizvodjaci: Proizvodjac[];
  vrsteProizvoda: VrstaProizvoda[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProizvodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Proizvod,
    public proizvodService: ProizvodService,
    public proizvodjacService: ProizvodjacService,
    public vrstaProizvodaService: VrstaProizvodaService) { }

  ngOnInit() {
    this.proizvodjacService.getProizvodjac().subscribe(proizvodjaci =>
      this.proizvodjaci = proizvodjaci
    );

    this.vrstaProizvodaService.getVrstaProizvoda().subscribe(vrsteProizvoda =>
      this.vrsteProizvoda = vrsteProizvoda
    );
  }

  compareTo(a: { id: any; }, b: { id: any; }) {
    return a.id == b.id;
  }

  onChange(proizvodjac: Proizvodjac, vrstaProizvoda: VrstaProizvoda) {
    this.data.proizvodjac = proizvodjac;
    this.data.vrstaProizvoda = vrstaProizvoda;
  }

  public add(): void {
    this.data.proizvodID = -1;
    this.proizvodService.addProizvod(this.data);
    this.snackBar.open("Uspešno dodat proizvod", "U redu", {
      duration: 2500,
    });
  }

  public update(): void {
    this.proizvodService.updateProizvod(this.data);
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
}