import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PortfolioResolver } from './resolvers/portfolio.resolver.service';
import { PortfoliosResolver } from './resolvers/portfolios.resolver.service';
import { CurrencyResolver } from './resolvers/currencies.resolver.service';

import { PortfoliosComponent } from './components/portfolios/portfolios.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { CurrenciesComponent } from './components/currencies/currencies.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'portfolios', pathMatch: 'full'
  },
  {
    path: 'portfolios',
    component: PortfoliosComponent,
    resolve: { portList: PortfoliosResolver },
  },
  {
    path: 'portfolio/:id',
    component: PortfolioComponent,
    resolve: { portfolio: PortfolioResolver },
  },
  {
    path: 'currencies',
    component: CurrenciesComponent,
    resolve: { currencyList: CurrencyResolver },
  },
  { path: '**', redirectTo: 'portfolios' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
