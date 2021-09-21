import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { PortfolioService } from '../services/portfolio.service';

import { Portfolio } from '../models/portfolio';

@Injectable({ providedIn: 'root' })
export class PortfolioResolver implements Resolve<Portfolio> {
    constructor(private portfolioServ: PortfolioService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Portfolio> | Promise<Portfolio> | Portfolio {
        return this.portfolioServ.getPortfolio(route.params.id);
    }
}