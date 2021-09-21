import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PortfoliosComponent } from './components/portfolios/portfolios.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { CurrenciesComponent } from './components/currencies/currencies.component';

import { SharedModule } from 'src/shared/shared.module';

import { ActionPortLineDialog } from './dialogs/action-portline-dialog/action-portline-dialog';
import { ConfirmActionDialog } from './dialogs/confirm-action-dialog/confirm-action-dialog';
import { ActionPortfolioDialog } from './dialogs/action-portfolio-dialog/action-portfolio-dialog';
import { ActionCurrencyDialog } from './dialogs/action-currency-dialog/action-currency-dialog';

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    PortfoliosComponent,
    PortfolioComponent,
    CurrenciesComponent,
    ConfirmActionDialog, ActionPortLineDialog, ActionPortfolioDialog, ActionCurrencyDialog
  ],
  entryComponents: [ ConfirmActionDialog, ActionPortLineDialog, ActionPortfolioDialog, ActionCurrencyDialog ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-ES' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
