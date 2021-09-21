import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ConfirmActionDialog } from 'src/app/dialogs/confirm-action-dialog/confirm-action-dialog';
import { ActionPortfolioDialog } from 'src/app/dialogs/action-portfolio-dialog/action-portfolio-dialog';

import { PortfolioService } from 'src/app/services/portfolio.service';
import { CurrencyService } from 'src/app/services/currency.service';

import { Portfolio, PortfolioLine } from 'src/app/models/portfolio';

import { actionDialogConfig } from 'src/shared/variables';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-portfolios',
  templateUrl: './portfolios.component.html',
  styleUrls: ['./portfolios.component.scss']
})
export class PortfoliosComponent implements OnInit {
  portList: Portfolio[];

  constructor(private route: ActivatedRoute, private portfolioServ: PortfolioService, private currencyServ: CurrencyService, private _dialog: MatDialog, private _snackBar: MatSnackBar,
  public loadingServ: LoadingService) { }

  ngOnInit(): void {
    this.portList = this.route.snapshot.data.portList;
    this.prepareEURValues();
  }

  async prepareEURValues() {
    let portLines: PortfolioLine[];
  
    for (let portfolio of this.portList) {
      if (portfolio.id !== undefined) {
        portLines = await this.portfolioServ.getPortfolioLines(portfolio.id);

        let eurValue: number = 0;
        for (const portLine of portLines) {
          if (portLine.currency !== null) {
            let resEUR: number = await this.currencyServ.getEURValueCripto(portLine.currency.acronym);
            // console.log(`Crypto '${portLine.currency.acronym}' has EUR value`, resEUR);
            eurValue = eurValue + (portLine.amount * resEUR);
          }
        }

        portfolio.eurValue = eurValue;
      }
    }
  }
  
  actionPortDialog(portfolio?: Portfolio) {
    let dialogConfig = actionDialogConfig;
    dialogConfig.maxWidth = "420px";
    dialogConfig.data = {
      porfolio: portfolio !== undefined ? portfolio : new Portfolio()
    };

    const dialogRef = this._dialog.open(ActionPortfolioDialog, dialogConfig);
    dialogRef.afterClosed().subscribe(portfolioDialog => {
      if (portfolioDialog) {
        this.loadingServ.actionInProgress = true;

        let newPortfolio: any = {
          name: portfolioDialog.name
        };

        if (portfolio !== undefined) {
          this.portfolioServ.updatePortfolio(portfolio.id, newPortfolio).then(res => {
            this.portList[this.portList.indexOf(portfolio)].name = newPortfolio.name;
          }).finally(() => this.loadingServ.actionInProgress = false);
        } else {
          this.portfolioServ.createPortfolio(newPortfolio).then(res => {
            res.eurValue = 0;
            this.portList.push(res);
          }).finally(() => this.loadingServ.actionInProgress = false);
        }
      }
    });
  }

  deletePortDialog(portfolio: Portfolio) {
    let dialogConfig = actionDialogConfig;
    dialogConfig.data = {
      title: "Borrar Portfolio",
      description: `¿Desea borrar el Portfolio (ID: ${portfolio.id})?`
    };

    const dialogRef = this._dialog.open(ConfirmActionDialog, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadingServ.actionInProgress = true;
        this.portfolioServ.deletePortfolio(portfolio.id).then(res => {
          if (res) { this.portList.splice(this.portList.indexOf(portfolio), 1); } else { this._snackBar.open("No se ha podido borrar"); }
        }).finally(() => this.loadingServ.actionInProgress = false);
      }
    });
  }
}
