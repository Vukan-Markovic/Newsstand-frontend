import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stavka-porudzbine',
  templateUrl: './stavka-porudzbine.component.html',
  styleUrls: ['./stavka-porudzbine.component.css']
})
export class StavkaPorudzbineComponent implements OnInit {
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
      });
    });
  }

  isArray() {
    if (!Array.isArray(this.proizvodjaci) || !Array.isArray(this.vrsteProizvoda))
      return false;
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

  public add(): void {
    this.setProizvod();
    this.proizvodService.addProizvod(this.proizvod).subscribe(data => {
      this.showSuccess(data);
    },
      error => {
        this.showError(error);
      });
  }

  public update(): void {
    this.setProizvod();
    this.proizvodService.updateProizvod(this.proizvod.proizvodID, this.proizvod).subscribe(data => {
      this.showSuccess(data);
    },
      error => {
        this.showError(error);
      });
  }

  public delete(): void {
    this.proizvodService.deleteProizvod(this.data.proizvodID).subscribe(data => {
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