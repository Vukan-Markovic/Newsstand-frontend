import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Proizvod } from 'src/app/_models/proizvod';
import { ProizvodService } from 'src/app/_services/proizvod.service';
import { Proizvodjac } from 'src/app/_models/proizvodjac';
import { VrstaProizvoda } from 'src/app/_models/vrstaProizvoda';
import { VrstaProizvodaService } from 'src/app/_services/vrstaProizvoda.service';
import { ProizvodjacService } from 'src/app/_services/proizvodjac.service';
import { ProizvodDialogComponent } from '../dialogs/proizvod-dialog/proizvod-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Porudzbina } from 'src/app/_models/porudzbina';
import { Racun } from 'src/app/_models/racun';
import { StavkaRacunaService } from 'src/app/_services/stavkaRacuna.service';
import { StavkaPorudzbineService } from 'src/app/_services/stavkaPorudzbine.service';
import { StavkaPorudzbineDialogComponent } from '../dialogs/stavka-porudzbine-dialog/stavka-porudzbine-dialog.component';
import { StavkaRacunaDialogComponent } from '../dialogs/stavka-racuna-dialog/stavka-racuna-dialog.component';

@Component({
  selector: 'app-proizvod',
  templateUrl: './proizvod.component.html',
  styleUrls: ['./proizvod.component.css']
})
export class ProizvodComponent implements OnInit {
  displayedColumns = ['nazivProizvoda', 'opisProizvoda', 'cena', 'tipPakovanja', 'velicinaPakovanja', 'barKod', 'masa', 'raspolozivaKolicina', 'proizvodjac', 'vrstaProizvoda', 'stavkaRacuna', 'stavkaPorudzbine', 'actions'];
  dataSource: MatTableDataSource<Proizvod>;
  i: number = 0;
  j: number = 0;
  k: number = 0;
  proizvodi: Proizvod[] = [];
  @Input() selektovanaPorudzbina: Porudzbina;
  @Input() selektovanRacun: Racun;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public proizvodService: ProizvodService, public dialog: MatDialog, public snackBar: MatSnackBar,
    public vrstaProizvodaService: VrstaProizvodaService, public proizvodjacService: ProizvodjacService,
    public stavkaRacunaService: StavkaRacunaService, public stavkaPorudzbineService: StavkaPorudzbineService) { }

  ngOnInit() {
    this.i = 0, this.j = 0;
    this.proizvodi = [];
    if (!this.selektovanaPorudzbina && !this.selektovanRacun) this.loadData();
  }

  ngOnChanges() {
    this.i = 0, this.j = 0;
    this.proizvodi = [];
    if (this.selektovanaPorudzbina) this.loadProizvodPorudzbina();
    else if (this.selektovanRacun) this.loadProizvodRacun();
  }

  public loadData() {
    this.proizvodService.getProizvodi().subscribe(data => {
      if (!Array.isArray(data)) return;
      this.k = data.length;

      data.forEach(element => {
        this.fillTable(element, null);
      });
    }, error => this.showError(error));
  }

  loadProizvodPorudzbina() {
    this.stavkaPorudzbineService.getStavkePorudzbine(this.selektovanaPorudzbina.porudzbinaID).subscribe(data => {
      if (!Array.isArray(data)) this.initializeTable();
      else {
        this.k = data.length;

        data.forEach(element => {
          this.proizvodService.getProizvod(element.proizvodID).subscribe(
            proizvod => this.fillTable(proizvod[0], element), error => this.showError(error));
        });
      }
    }, error => this.showError(error));
  }

  loadProizvodRacun() {
    this.stavkaRacunaService.getStavkeRacuna(this.selektovanRacun.racunID).subscribe(data => {
      if (!Array.isArray(data)) this.initializeTable();
      else {
        this.k = data.length;

        data.forEach(element => {
          this.proizvodService.getProizvod(element.proizvodID).subscribe(
            proizvod => this.fillTable(proizvod[0], element), error => this.showError(error));
        });
      }
    }, error => this.showError(error));
  }

  initializeTable() {
    this.dataSource = new MatTableDataSource(this.proizvodi);

    this.dataSource.filterPredicate = (data, filter: string) => {
      const accumulator = (currentTerm: string, key: string) => {
        if (key === 'vrstaProizvoda')
          return currentTerm + data.vrstaProizvoda.nazivVrsteProizvoda;
        else if (key === 'proizvodjac')
          return currentTerm + data.proizvodjac.nazivProizvodjaca;
        return currentTerm + data[key];
      };

      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };

    this.dataSource.sortingDataAccessor = (data, property) => {
      if (data[property]) {
        switch (property) {
          case 'vrstaProizvoda': return data.vrstaProizvoda.nazivVrsteProizvoda.toLocaleLowerCase();
          case 'proizvodjac': return data.proizvodjac.nazivProizvodjaca.toLocaleLowerCase();
          default: return typeof data[property] == "string" ? data[property].toLocaleLowerCase() : data[property];
        }
      }
    };

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fillTable(element, stavka) {
    var proizvod = new Proizvod();
    proizvod.barKod = element.barKod;
    proizvod.cena = element.cena;
    proizvod.masa = element.masa;
    proizvod.nazivProizvoda = element.nazivProizvoda;
    proizvod.opisProizvoda = element.opisProizvoda;
    proizvod.proizvodID = element.proizvodID;
    proizvod.raspolozivaKolicina = element.raspolozivaKolicina;
    proizvod.tipPakovanja = element.tipPakovanja;
    proizvod.velicinaPakovanja = element.velicinaPakovanja;

    if (stavka != null) {
      if (stavka['porudzbinaID']) proizvod.stavkaPorudzbine = stavka;
      else if (stavka['racunID']) proizvod.stavkaRacuna = stavka;
    }

    this.proizvodi.push(proizvod);

    this.vrstaProizvodaService.getVrstaProizvoda(element.vrstaProizvodaID).subscribe(vrstaProizvoda => {
      this.proizvodi[this.j++].vrstaProizvoda = vrstaProizvoda[0];

      this.proizvodjacService.getProizvodjac(element.proizvodjacID).subscribe(proizvodjac => {
        this.proizvodi[this.i++].proizvodjac = proizvodjac[0];
        if (this.k == this.i && this.k == this.j) this.initializeTable();
      }, error => this.showError(error));
    }, error => this.showError(error));
  }

  showError(error) {
    this.snackBar.open(error, "U redu", {
      duration: 2000,
      panelClass: ['red-snackbar']
    });
  }

  public openDialog(flag: number, proizvodID?: number,
    nazivProizvoda?: string,
    opisProizvoda?: string,
    cena?: number,
    tipPakovanja?: string,
    velicinaPakovanja?: string,
    barKod?: string,
    masa?: number,
    raspolozivaKolicina?: number,
    proizvodjac?: Proizvodjac,
    vrstaProizvoda?: VrstaProizvoda) {
    const dialogRef = this.dialog.open(ProizvodDialogComponent, {
      data: {
        i: proizvodID, proizvodID: proizvodID, nazivProizvoda: nazivProizvoda, opisProizvoda: opisProizvoda, cena: cena,
        tipPakovanja: tipPakovanja, velicinaPakovanja: velicinaPakovanja, masa: masa, raspolozivaKolicina: raspolozivaKolicina, proizvodjac: proizvodjac,
        vrstaProizvoda: vrstaProizvoda, barKod: barKod
      }
    });

    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) this.loadData();
    });
  }

  public openStavkaPorudzbineDialog(flag: number, proizvodID?: number) {
    const dialogRef = this.dialog.open(StavkaPorudzbineDialogComponent, {
      data: {
        porudzbinaID: this.selektovanaPorudzbina.porudzbinaID, proizvodID: proizvodID
      }
    });

    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) this.loadProizvodPorudzbina();
    });
  }

  public openStavkaRacunaDialog(flag: number, proizvodID?: number) {
    const dialogRef = this.dialog.open(StavkaRacunaDialogComponent, {
      data: {
        racunID: this.selektovanRacun.racunID, proizvodID: proizvodID
      }
    });

    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) this.loadProizvodRacun();
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}