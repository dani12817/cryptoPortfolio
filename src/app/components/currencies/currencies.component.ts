import { AfterContentInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { ActionCurrencyDialog } from 'src/app/dialogs/action-currency-dialog/action-currency-dialog';
import { ConfirmActionDialog } from 'src/app/dialogs/confirm-action-dialog/confirm-action-dialog';

import { LoadingService } from 'src/app/services/loading.service';
import { CurrencyService } from 'src/app/services/currency.service';

import { Currency } from 'src/app/models/currency';

import { actionDialogConfig } from 'src/shared/variables';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})
export class CurrenciesComponent implements OnInit, AfterContentInit {
  currencyList: Currency[];

  constructor(private route: ActivatedRoute, private _dialog: MatDialog, private _snackBar: MatSnackBar, public loadingServ: LoadingService, private currencyServ: CurrencyService) { }

  ngOnInit(): void {
    this.currencyList = this.route.snapshot.data.currencyList;
    this.prepareEURValues();
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      if (!this.loadingServ.loadingRealCryptos && this.currencyServ.realCryptos.length === 0) {
        this.loadingServ.loadingRealCryptos = true;
        this.currencyServ.getAllRealCrypto();
      }
    });
  }

  async prepareEURValues() {  
    for (let currency of this.currencyList) {
      let resEUR: number = await this.currencyServ.getEURValueCripto(currency.acronym);
      currency.eurValue = resEUR;
    }
  }

  actionCurrenDialog(currency?: Currency) {
    let dialogConfig = actionDialogConfig;
    dialogConfig.maxWidth = "420px";
    dialogConfig.data = {
      currency: currency !== undefined ? currency : new Currency()
    };

    const dialogRef = this._dialog.open(ActionCurrencyDialog, dialogConfig);
    dialogRef.afterClosed().subscribe(currencyDialog => {
      if (currencyDialog) {
        this.loadingServ.actionInProgress = true;

        let newPortLine = {
          acronym: currencyDialog.acronym,
          name: currencyDialog.name
        };

        if (currency !== undefined) {
          this.currencyServ.updateCurrency(currency.id, newPortLine).then(res => {
            let index: number = this.currencyList.indexOf(currency);
            this.currencyList[index].name = newPortLine.name;
            this.currencyList[index].acronym = newPortLine.acronym;
            this.prepareEURValues();
          }).finally(() => this.loadingServ.actionInProgress = false);
        } else {
          this.currencyServ.createCurrency(newPortLine).then(res => {
            this.currencyList.push(res);
            this.prepareEURValues();
          }).finally(() => this.loadingServ.actionInProgress = false);
        }
      }
    });
  }

  deleteCurrenDialog(currency: Currency) {
    let dialogConfig = actionDialogConfig;
    dialogConfig.data = {
      title: "Borrar Criptomoneda",
      description: `¿Desea borrar la Criptomoneda '${currency.name}'?`
    };

    const dialogRef = this._dialog.open(ConfirmActionDialog, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadingServ.actionInProgress = true;
        this.currencyServ.deleteCurrency(currency.id).then(res => {
          if (res) { this.currencyList.splice(this.currencyList.indexOf(currency), 1); } else { this._snackBar.open("No se ha podido borrar"); }
        }).finally(() => this.loadingServ.actionInProgress = false);
      }
    });
  }
}
