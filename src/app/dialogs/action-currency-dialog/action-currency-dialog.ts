import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CurrencyService } from 'src/app/services/currency.service';

import { Currency, RealCrypto } from 'src/app/models/currency';

import { FormClass } from 'src/shared/form-class';

@Component({
  templateUrl: './action-currency-dialog.html',
  styleUrls: ['./action-currency-dialog.scss'],
})
export class ActionCurrencyDialog implements OnInit {
  currencyFrom: FormClass;
  currency: Currency;

  constructor(private dialogRef: MatDialogRef<ActionCurrencyDialog>, @Inject(MAT_DIALOG_DATA) private data: any, public currencyServ: CurrencyService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.currency = this.data.currency;

    this.currencyFrom = new FormClass(new FormGroup({
      'name': new FormControl({ value: null, disabled: false }, [Validators.required]),
      'acronym': new FormControl({ value: null, disabled: false }, [Validators.required])
    }));

    if (this.currency.id) {
      this.currencyFrom.patchValue({name: this.currency.name, acronym: this.currency.acronym});
    }
  }

  checkCrypto() {
    let cryptoFound: RealCrypto = this.currencyServ.realCryptos.find(crypto => crypto.Name === this.currencyFrom.get('acronym').value);
    if (cryptoFound !== undefined) {
      this.currencyFrom.get('name').setValue(cryptoFound.CoinName);
    } else { this._snackBar.open("No se ha encontrado ninguna Criptomoneda con ese Acrónimo"); }
  }

  prepareSelectedOption(event: any) {
    this.currencyFrom.patchValue({name: event.option.value.CoinName, acronym: event.option.value.Name});
  }

  displayFn(realCrypto: RealCrypto): string {
    return (realCrypto && realCrypto.CoinName) ? realCrypto.CoinName : '';
  }

  emptyRealCryptos(): boolean {
    return this.currencyServ.realCryptos.length === 0;
  }

  closeDialog(cancel: boolean = false) {
    console.log('closeDialog', cancel);
    this.dialogRef.close(cancel ? null : this.currencyFrom.getAllValue());
  }
}
