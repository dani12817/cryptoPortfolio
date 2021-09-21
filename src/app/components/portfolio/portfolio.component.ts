import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { CurrencyService } from 'src/app/services/currency.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { LoadingService } from 'src/app/services/loading.service';

import { Portfolio, PortfolioLine } from 'src/app/models/portfolio';

import { ConfirmActionDialog } from 'src/app/dialogs/confirm-action-dialog/confirm-action-dialog';
import { ActionPortLineDialog } from 'src/app/dialogs/action-portline-dialog/action-portline-dialog';
import { ActionPortfolioDialog } from 'src/app/dialogs/action-portfolio-dialog/action-portfolio-dialog';

import { actionDialogConfig, currencyUrl, portfolioUrl } from 'src/shared/variables';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  portfolio: Portfolio;

  constructor(private route: ActivatedRoute, private portfolioServ: PortfolioService, private currencyServ: CurrencyService, public loadingServ: LoadingService,
  private _dialog: MatDialog, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.portfolio = this.route.snapshot.data.portfolio;
    this.preparePortfolioLines();
  }

  async preparePortfolioLines() {
    this.loadingServ.loadingPortLines = true;
    let portLines: PortfolioLine[] = await this.portfolioServ.getPortfolioLines(this.portfolio.id);
    
    let eurValue: number = 0;
    for (let portLine of portLines) {
      if (portLine.currency !== null) {
        let resEUR: number = await this.currencyServ.getEURValueCripto(portLine.currency.acronym);
        portLine.currency.eurValue = resEUR;
        eurValue = eurValue + (portLine.amount * resEUR);
      }
    }

    this.portfolio.portLines = portLines;
    this.portfolio.eurValue = eurValue;
    this.loadingServ.loadingPortLines = false;
  }
  
  actionPortDialog() {
    let dialogConfig = actionDialogConfig;
    dialogConfig.maxWidth = "420px";
    dialogConfig.data = {
      porfolio: this.portfolio
    };

    const dialogRef = this._dialog.open(ActionPortfolioDialog, dialogConfig);
    dialogRef.afterClosed().subscribe(portfolioDialog => {
      if (portfolioDialog) {
        this.loadingServ.actionInProgress = true;

        let newPortfolio: any = {
          name: portfolioDialog.name
        };

        this.portfolioServ.updatePortfolio(this.portfolio.id, newPortfolio).then(res => {
          this.portfolio.name = newPortfolio.name;
        }).finally(() => this.loadingServ.actionInProgress = false);
      }
    });
  }

  deletePortDialog() {
    let dialogConfig = actionDialogConfig;
    dialogConfig.data = {
      title: "Borrar Portfolio",
      description: `¿Desea borrar el Portfolio (ID: ${this.portfolio.id})?`
    };

    const dialogRef = this._dialog.open(ConfirmActionDialog, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadingServ.actionInProgress = true;
        this.portfolioServ.deletePortfolio(this.portfolio.id).then(res => {
          if (res) { this.router.navigate(['/portfolio']); } else { this._snackBar.open("No se ha podido borrar"); }
        }).finally(() => this.loadingServ.actionInProgress = false);
      }
    });
  }

  actionPortLineDialog(portLine?: PortfolioLine) {
    let dialogConfig = actionDialogConfig;
    dialogConfig.maxWidth = "420px";
    dialogConfig.data = {
      portLine: portLine !== undefined ? portLine : new PortfolioLine(), currentPortLines: this.portfolio.portLines
    };

    const dialogRef = this._dialog.open(ActionPortLineDialog, dialogConfig);
    dialogRef.afterClosed().subscribe(portLineDialog => {
      if (portLineDialog) {
        this.loadingServ.actionInProgress = true;

        let newPortLine = {
          amount: portLineDialog.amount,
          currency: currencyUrl + portLineDialog.currency,
          portfolio: portfolioUrl + this.portfolio.id
        };

        this.portfolio.portLines = [];
        if (portLine !== undefined) {
          this.portfolioServ.updatePortfolioLine(portLine.id, newPortLine).then(res => {
            this.preparePortfolioLines();
          }).finally(() => this.loadingServ.actionInProgress = false);
        } else {
          this.portfolioServ.createPortfolioLine(newPortLine).then(res => {
            this.preparePortfolioLines();
          }).finally(() => this.loadingServ.actionInProgress = false);
        }
      }
    });
  }

  deletePortLineDialog(portLine: PortfolioLine) {
    let dialogConfig = actionDialogConfig;
    dialogConfig.data = {
      title: "Borrar Criptomenda",
      description: `¿Desea desvincular la criptomoneda ${portLine.currency.name}(${portLine.currency.acronym}) del Portfolio?`
    };

    const dialogRef = this._dialog.open(ConfirmActionDialog, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadingServ.actionInProgress = true;
        this.portfolioServ.deletePortfolioLine(portLine.id).then(res => {
          console.log("res", res);
          if (res) { this.portfolio.portLines.splice(this.portfolio.portLines.indexOf(portLine), 1); } else { this._snackBar.open("No se ha podido borrar"); }
        }).finally(() => this.loadingServ.actionInProgress = false);
      }
    });
  }
}
