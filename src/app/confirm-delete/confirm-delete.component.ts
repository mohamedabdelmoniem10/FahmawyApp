import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) { }


  openSnackBar(mesg, action) {
    this.snackBar.open(mesg, action,{
      duration: 2000,
    });
    // let snackBarRef = this.snackBar.open(mesg, action);
    // snackBarRef.afterDismissed().subscribe(() => {

    // });


  }

  ngOnInit() {
  }

}
