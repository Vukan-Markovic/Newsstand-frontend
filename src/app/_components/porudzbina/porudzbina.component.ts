import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Porudzbina } from 'src/app/_models/porudzbina';
import { PorudzbinaService } from 'src/app/_services/porudzbina.service';
import { PorudzbinaDialogComponent } from '../dialogs/porudzbina-dialog/porudzbina-dialog.component';
import { Dobavljac } from 'src/app/_models/dobavljac';
import { Menadzer } from 'src/app/_models/menadzer';
import { Prodavac } from 'src/app/_models/prodavac';

@Component({
  selector: 'app-porudzbina',
  templateUrl: './porudzbina.component.html',
  styleUrls: ['./porudzbina.component.css']
})
export class PorudzbinaComponent implements OnInit {
  displayedColumns = ['datumPorucivanja', 'datumIsporuke', 'ukupanIznosPorudzbine', 'statusPorudzbine', 'dobavljac', 'menadzer', 'prodavac', 'actions'];
  dataSource: MatTableDataSource<Porudzbina>;
  selektovanTim: Tim;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public porudzbinaService: PorudzbinaService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.porudzbinaService.getPorudzbina().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key: string) => {
          return key === 'liga' ? currentTerm + data.liga.naziv : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'liga': return data.liga.naziv.toLocaleLowerCase();
          default: return data[property];
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  public openDialog(flag: number, porudzbinaID: number,
    datumPorucivanja: Date,
    datumIsporuke: Date,
    ukupanIznosPorudzbine: number,
    statusPorudzbine: string,
    dobavljac: Dobavljac, 
    menadzer: Menadzer,
    prodavac: Prodavac) {
    const dialogRef = this.dialog.open(PorudzbinaDialogComponent,
      { data: { id: porudzbinaID, datumPorucivanja: datumPorucivanja, datumIsporuke: datumIsporuke, ukupanIznosPorudzbine: ukupanIznosPorudzbine, statusPorudzbine: statusPorudzbine, 
        dobavljac: dobavljac, menadzer: menadzer, prodavac: prodavac } }
    );
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe((result: number) => {
      if (result == 1) this.loadData();
    });
  }

  selectRow(row: Tim) {
    this.selektovanTim = row;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}