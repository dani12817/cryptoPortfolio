import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Portfolio } from 'src/app/models/portfolio';

import { FormClass } from 'src/shared/form-class';

@Component({
  templateUrl: './action-portfolio-dialog.html',
  styleUrls: ['./action-portfolio-dialog.scss'],
})
export class ActionPortfolioDialog implements OnInit {
  porfolioFrom: FormClass;
  porfolio: Portfolio;

  constructor(private dialogRef: MatDialogRef<ActionPortfolioDialog>, @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {
    this.porfolio = this.data.porfolio;

    this.porfolioFrom = new FormClass(new FormGroup({
      'name': new FormControl({ value: null, disabled: false }, [Validators.required])
    }));

    if (this.porfolio.id) {
      this.porfolioFrom.patchValue({name: this.porfolio.name});
    }
  }

  closeDialog(cancel: boolean = false) {
    this.dialogRef.close(cancel ? null : this.porfolioFrom.getAllValue());
  }
}
