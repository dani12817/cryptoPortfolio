import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { CurrencyService } from '../services/currency.service';

import { Currency } from '../models/currency';

@Injectable({ providedIn: 'root' })
export class CurrencyResolver implements Resolve<Currency[]> {
    constructor(private currencyServ: CurrencyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Currency[]> | Promise<Currency[]> | Currency[] {
        return this.currencyServ.getCurrencies();
    }
}