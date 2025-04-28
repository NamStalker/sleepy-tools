import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  notifLength: string;
  notifUnit: string;
}

@Component({
  selector: 'app-reminder-options',
  imports: [
    FormsModule,
    MatDialogModule
  ],
  templateUrl: './reminder-options.component.html',
  styleUrl: './reminder-options.component.scss'
})
export class ReminderOptionsComponent {
  
  constructor(public dialogRef: MatDialogRef<ReminderOptionsComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  cancel(): void {
    this.dialogRef.close();
  }
}
