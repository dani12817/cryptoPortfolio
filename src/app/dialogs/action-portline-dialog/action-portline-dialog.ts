import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CurrencyService } from 'src/app/services/currency.service';

import { PortfolioLine } from 'src/app/models/portfolio';
import { Currency } from 'src/app/models/currency';

import { FormClass } from 'src/shared/form-class';

@Component({
  templateUrl: './action-portline-dialog.html',
  styleUrls: ['./action-portline-dialog.scss'],
})
export class ActionPortLineDialog implements OnInit {
  portLineFrom: FormClass;
  portLine: PortfolioLine;

  currentPortLines: PortfolioLine[];

  cryptoCurrencies: Currency[];

  constructor(private dialogRef: MatDialogRef<ActionPortLineDialog>, @Inject(MAT_DIALOG_DATA) private data: any, private currencyServ: CurrencyService) { }

  ngOnInit(): void {
    this.portLine = this.data.portLine;
    this.currentPortLines = this.data.currentPortLines;

    this.portLineFrom = new FormClass(new FormGroup({
      'amount': new FormControl({ value: null, disabled: false }, [Validators.required]),
      'currency': new FormControl({ value: null, disabled: true }, [Validators.required])
    }));

    if (this.portLine.id) {
      this.portLineFrom.patchValue({amount: this.portLine.amount, currency: this.portLine.currency.id});
    }

    this.currencyServ.getCurrencies().then(res => {
      if (!this.portLine.id) { this.removeCryto(res); } else { this.cryptoCurrencies = res; }
    });
  }

  removeCryto(cryptoCurren: Currency[]) {
    for (const portLine of this.currentPortLines) {
      if (portLine.currency !== null) {
        let findIndex = cryptoCurren.findIndex(crypt => crypt.id === portLine.currency.id)
        if (findIndex > -1) {
          cryptoCurren.splice(findIndex, 1);
        }
      }
    }

    if (cryptoCurren.length > 0) {
      this.portLineFrom.get('currency').enable();
    }

    this.cryptoCurrencies = cryptoCurren;
  }

  closeDialog(cancel: boolean = false) {
    this.dialogRef.close(cancel ? null : this.portLineFrom.getAllValue());
  }
}
