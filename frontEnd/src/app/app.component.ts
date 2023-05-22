import { FormBuilder, FormsModule } from '@angular/forms';
import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CarServiceService } from './car-service.service';
import { CarDialogComponent } from './car-dialog/car-dialog.component';
import { CarEditDialogComponent } from './car-edit-dialog/car-edit-dialog.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'lsiproject';


  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CarDialogComponent, {
          width:'29%',
          height:'84%'
    });

    dialogRef.afterClosed().subscribe(result => {
       console.log('The dialog was closed');

    });
  }

}
