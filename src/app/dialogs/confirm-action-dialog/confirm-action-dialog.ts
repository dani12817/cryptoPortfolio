import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConfirmAction } from 'src/app/models/confirm.action';

@Component({
  templateUrl: './confirm-action-dialog.html',
  styleUrls: ['./confirm-action-dialog.scss'],
})
export class ConfirmActionDialog {
  confirmAction: ConfirmAction;

  constructor(private dialogRef: MatDialogRef<ConfirmActionDialog>, @Inject(MAT_DIALOG_DATA) private data: ConfirmAction) {
    this.confirmAction = this.data;
  }

  closeDialog(action: boolean) {
    this.dialogRef.close(action);
  }
}
