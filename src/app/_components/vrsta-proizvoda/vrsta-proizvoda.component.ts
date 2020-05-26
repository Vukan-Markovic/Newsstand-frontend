import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { VrstaProizvoda } from 'src/app/_models/vrstaProizvoda';
import { VrstaProizvodaService } from 'src/app/_services/vrstaProizvoda.service';
import { VrstaProizvodaDialogComponent } from '../dialogs/vrsta-proizvoda-dialog/vrsta-proizvoda-dialog.component';

@Component({
  selector: 'app-vrsta-proizvoda',
  templateUrl: './vrsta-proizvoda.component.html',
  styleUrls: ['./vrsta-proizvoda.component.css']
})
export class VrstaProizvodaComponent implements OnInit {
  displayedColumns = ['nazivVrsteProizvoda', 'opisVrsteProizvoda', 'actions'];
  dataSource: MatTableDataSource<VrstaProizvoda>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public vrstaProizvodaService: VrstaProizvodaService, public dialog: MatDialog) { }

  ngOnInit() { }

  public loadData() {
    this.vrstaProizvodaService.getVrsteProizvoda().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
        return data[property].toLocaleLowerCase();
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  public openDialog(flag: number, vrstaProizvodaID: number, nazivVrsteProizvoda: string, opisVrsteProizvoda: string) {
    const dialogRef = this.dialog.open(VrstaProizvodaDialogComponent, {
      data: {
        i: vrstaProizvodaID, id: vrstaProizvodaID, nazivVrsteProizvoda: nazivVrsteProizvoda, opisVrsteProizvoda: opisVrsteProizvoda
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