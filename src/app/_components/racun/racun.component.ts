import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Racun } from 'src/app/_models/racun';
import { RacunService } from 'src/app/_services/racun.service';
import { Prodavac } from 'src/app/_models/prodavac';
import { RacunDialogComponent } from '../dialogs/racun-dialog/racun-dialog.component';

@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.css']
})
export class RacunComponent implements OnInit {
  displayedColumns = ['vremeIzdavanja', 'mestoIzdavanja', 'ukupanIznosRacuna', 'nazivProdavnice', 'nacinPlacanja', 'brojRacuna', 'tipRacuna', 'prodavac', 'actions'];
  dataSource: MatTableDataSource<Racun>;
  // selektovanTim: Tim;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public racunService: RacunService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.racunService.getRacuni().subscribe(data => {
      if (!Array.isArray(data)) return;
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key: string) => {
          // return key === 'liga' ? currentTerm + data.liga.naziv : currentTerm + data[key];
        };

        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          // case 'liga': return data.liga.naziv.toLocaleLowerCase();
          default: return data[property];
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  public openDialog(flag: number, racunID?: number,
    vremeIzdavanja?: Date,
    mestoIzdavanja?: string,
    ukupanIznosRacuna?: number,
    nazivProdavnice?: string,
    nacinPlacanja?: string,
    brojRacuna?: string,
    tipRacuna?: string,
    prodavac?: Prodavac) {
    const dialogRef = this.dialog.open(RacunDialogComponent,
      {
        data: {
          racunID: racunID, vremeIzdavanja: vremeIzdavanja, mestoIzdavanja: mestoIzdavanja, ukupanIznosRacuna: ukupanIznosRacuna,
          nazivProdavnice: nazivProdavnice, nacinPlacanja: nacinPlacanja, brojRacuna: brojRacuna, tipRacuna: tipRacuna
          , prodavac: prodavac
        }
      }
    );

    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe((result: number) => {
      if (result == 1) this.loadData();
    });
  }

  // selectRow(row: Tim) {
  //   this.selektovanTim = row;
  // }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}