import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Proizvod } from 'src/app/_models/proizvod';
import { ProizvodService } from 'src/app/_services/proizvod.service';
import { Proizvodjac } from 'src/app/_models/proizvodjac';
import { VrstaProizvoda } from 'src/app/_models/vrstaProizvoda';
import { ProizvodjacDialogComponent } from '../dialogs/proizvodjac-dialog/proizvodjac-dialog.component';

@Component({
  selector: 'app-proizvod',
  templateUrl: './proizvod.component.html',
  styleUrls: ['./proizvod.component.css']
})
export class ProizvodComponent implements OnInit {
  displayedColumns = ['nazivProizvoda', 'opisProizvoda', 'cena', 'tipPakovanja', 'velicinaPakovanja', 'barKod', 'masa', 'raspolozivaKolicina', 'proizvodjac', 'vrstaProizvoda', 'actions'];
  dataSource: MatTableDataSource<Proizvod>;
  // @Input() selektovanTim: Tim;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public proizvodService: ProizvodService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  // ngOnChanges() {
  //   if (this.selektovanTim.id) this.loadData();
  // }

  public loadData() {
    this.proizvodService.getProizvodi()
      .subscribe(data => {
        if (!Array.isArray(data)) return;
        this.dataSource = new MatTableDataSource(data);
        // this.dataSource.filterPredicate = (data, filter: string) => {
        //   const accumulator = (currentTerm: string, key: string) => {
        //     return key === 'nacionalnost' ? currentTerm + data.nacionalnost.naziv : currentTerm + data[key];
        //   };
        //   const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        //   const transformedFilter = filter.trim().toLowerCase();
        //   return dataStr.indexOf(transformedFilter) !== -1;
        // };

        this.dataSource.sortingDataAccessor = (data, property) => {
          switch (property) {
            // case 'nacionalnost': return data.nacionalnost.naziv.toLocaleLowerCase();
            default: return data[property];
          }
        };

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
    const dialogRef = this.dialog.open(ProizvodjacDialogComponent, {
      data: {
        i: proizvodID, proizvodID: proizvodID, nazivProizvoda: nazivProizvoda, opisProizvoda: opisProizvoda, cena: cena,
        tipPakovanja: tipPakovanja, velicinaPakovanja: velicinaPakovanja, masa: masa, raspolozivaKolicina: raspolozivaKolicina, proizvodjac: proizvodjac,
        vrstaProizvoda: vrstaProizvoda
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