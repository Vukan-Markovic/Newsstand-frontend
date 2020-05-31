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

@Component({
  selector: 'app-proizvod',
  templateUrl: './proizvod.component.html',
  styleUrls: ['./proizvod.component.css']
})
export class ProizvodComponent implements OnInit {
  displayedColumns = ['nazivProizvoda', 'opisProizvoda', 'cena', 'tipPakovanja', 'velicinaPakovanja', 'barKod', 'masa', 'raspolozivaKolicina', 'proizvodjac', 'vrstaProizvoda', 'actions'];
  dataSource: MatTableDataSource<Proizvod>;
  i: number = 0;
  j: number = 0;
  k: number = 0;
  proizvodi: Proizvod[] = [];
  // @Input() selektovanTim: Tim;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public proizvodService: ProizvodService, public dialog: MatDialog,
    public vrstaProizvodaService: VrstaProizvodaService, public proizvodjacService: ProizvodjacService) { }

  ngOnInit() {
    this.loadData();
  }

  // ngOnChanges() {
  //   if (this.selektovanTim.id) this.loadData();
  // }

  public loadData() {
    this.i = 0, this.j = 0;
    this.proizvodi = [];

    this.proizvodService.getProizvodi()
      .subscribe(data => {
        if (!Array.isArray(data)) return;
        this.k = data.length;

        data.forEach(element => {
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
          this.proizvodi.push(proizvod);

          this.vrstaProizvodaService.getVrstaProizvoda(element.vrstaProizvodaID).subscribe(vrstaProizvoda => {
            this.proizvodi[this.j++].vrstaProizvoda = vrstaProizvoda[0];

            this.proizvodjacService.getProizvodjac(element.proizvodjacID).subscribe(proizvodjac => {
              this.proizvodi[this.i++].proizvodjac = proizvodjac[0];
    
              if (this.k == this.i && this.k == this.j) {
                this.dataSource = new MatTableDataSource(this.proizvodi);
console.log(this.proizvodi);
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
                      default: return typeof data[property] == "string"? data[property].toLocaleLowerCase(): data[property];
                    }
                  }
                };

                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              }

            });
          });
        });
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
    // if (flag == 1) dialogRef.componentInstance.data.tim = this.selektovanTim;

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1)
        this.loadData();
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}