  
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Izvestaj } from 'src/app/_models/izvestaj';
import { IzvestajService } from 'src/app/_services/izvestaj.service';
import { Menadzer } from 'src/app/_models/menadzer';
import { IzvestajDialogComponent } from '../dialogs/izvestaj-dialog/izvestaj-dialog.component';

@Component({
  selector: 'app-igrac',
  templateUrl: './igrac.component.html',
  styleUrls: ['./igrac.component.css']
})
export class IgracComponent implements OnInit {
  displayedColumns = ['promet', 'brojKupovina', 'datumOd', 'datumDo', 'menadzer', 'actions'];
  dataSource: MatTableDataSource<Izvestaj>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public izvestajService: IzvestajService, public dialog: MatDialog) { }

  ngOnInit() { }

  public loadData() {
    this.izvestajService.getIzvestaj().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
        return data[property].toLocaleLowerCase();
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  public openDialog(flag: number,  izvestajID: number,
    promet: number,
    brojKupovina: number,
    datumOd: Date,
    datumDo: Date,
    menadzer: Menadzer) {
    const dialogRef = this.dialog.open(IzvestajDialogComponent, {
      data: {
        i: izvestajID, id: izvestajID, promet: promet, brojKupovina: brojKupovina, datumOd: datumOd,
        datumDo: datumDo, menadzer: menadzer
      }
    });
    dialogRef.componentInstance.flag = flag;
    
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1)
        this.loadData();
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}