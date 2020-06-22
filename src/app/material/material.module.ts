import { NgModule } from '@angular/core';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatRippleModule, MatListModule, MatInputModule, MatTableModule, MatCheckboxModule, MatFormFieldModule, MatDividerModule, MatDialogModule, MatSnackBarModule, MatPaginatorModule, MatCardModule } from '@angular/material'

const material = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatRippleModule,
  MatListModule,
  MatInputModule,
  MatTableModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatDividerModule,
  MatDialogModule,
  MatSnackBarModule,
  MatPaginatorModule,
  MatCardModule
]

@NgModule({
  imports: [ 
    material
   ],
  exports: [
    material
   ]
})
export class MaterialModule { }
