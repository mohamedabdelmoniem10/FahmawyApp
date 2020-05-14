import { Component, OnInit } from '@angular/core';
import { ServService } from 'src/app/serv.service';
import { MatTableDataSource } from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { trigger, state, style, transition, animate } from '@angular/animations';








@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class UsersComponent implements OnInit {

  usersData;
  selectedData = [];

  displayedColumns: string[] = ['select', 'id', 'email', 'name', 'avatar', 'search'];
  dataSource = new MatTableDataSource(this.usersData);
  selection = new SelectionModel(true, [])


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  constructor(private service: ServService) { }

  getUsersFromServ() {
    this.service.getAllUsers().subscribe(res => {
      this.usersData = res;
      this.dataSource = new MatTableDataSource(this.usersData.data);
    });
  }

 /** Whether the number of selected elements matches the total number of rows. */
 isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  // this.selectedData.push(this.selection.selected)
  return numSelected === numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected() ?
  this.selection.clear() :
  this.dataSource.data.forEach(row => this.selection.select(row));
}

/** The label for the checkbox on the passed row */
checkboxLabel(row): string {
  if (!row) {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
}
i : number;
getSelectedItem() {
  console.log('this is the selected data', this.selection.selected);
  for(this.i = 0; this.i < this.selection.selected.length; this.i++) {
    
    this.service.delete(this.selection.selected[this.i].id).subscribe(res => {
      console.log(res)
    })
  }
}


ngOnInit() {
    this.getUsersFromServ();
  }

}
