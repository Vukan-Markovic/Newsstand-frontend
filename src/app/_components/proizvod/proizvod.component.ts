  
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-igrac',
  templateUrl: './igrac.component.html',
  styleUrls: ['./igrac.component.css']
})
export class IgracComponent implements OnInit {
  displayedColumns = ['ime', 'prezime', 'brojReg', 'datumRodjenja', 'nacionalnost', 'tim', 'actions'];
  dataSource: MatTableDataSource<Igrac>;
  @Input() selektovanTim: Tim;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public igracService: IgracService, public dialog: MatDialog) { }

  ngOnInit() { }

  ngOnChanges() {
    if (this.selektovanTim.id) this.loadData();
  }

  public loadData() {
    this.igracService.getIgraceZaTim(this.selektovanTim.id)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm: string, key: string) => {
            return key === 'nacionalnost' ? currentTerm + data.nacionalnost.naziv : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        this.dataSource.sortingDataAccessor = (data, property) => {
          switch (property) {
            case 'nacionalnost': return data.nacionalnost.naziv.toLocaleLowerCase();
            default: return data[property];
          }
        };

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  public openDialog(flag: number, id: number, ime: string, prezime: string, brojReg: string,
    datumRodjenja: Date, nacionalnost: Nacionalnost, tim: Tim) {
    const dialogRef = this.dialog.open(IgracDialogComponent, {
      data: {
        i: id, id: id, ime: ime, prezime: prezime, brojReg: brojReg,
        datumRodjenja: datumRodjenja, nacionalnost: nacionalnost, tim: tim
      }
    });
    dialogRef.componentInstance.flag = flag;
    if (flag == 1) dialogRef.componentInstance.data.tim = this.selektovanTim;

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1)
        this.loadData();
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}