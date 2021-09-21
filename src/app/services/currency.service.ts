import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { HttpService } from './http.service';
import { LoadingService } from './loading.service';

import { Currency, RealCrypto } from '../models/currency';

import { baseUrl } from 'src/shared/variables';

@Injectable({providedIn: 'root'})
export class CurrencyService {
    criptoValueCache: any = {};

    realCryptos: RealCrypto[] = [];
    realCryptoControl = new FormControl({ value: null, disabled: true });
    filteredRealCryptos: Observable<RealCrypto[]>;

    constructor(private http: HttpService, private loadingServ: LoadingService) { }

    getCurrencies(): Promise<Currency[]> {
        return new Promise<Currency[]>((resolve, reject) => {
            this.http.get('/currency').toPromise().then((res: any) => {
                // console.log("getCurrencies", res);
                resolve(res._embedded.currencies);
            }).catch(err => reject(err));
        });
    }

    getCurrency(id: string, isURL: boolean = false): Promise<Currency> {
        let fullUrl: string = isURL ? id.replace(baseUrl, "") : `/currency/${id}`;

        return new Promise<Currency>((resolve, reject) => {
            this.http.get(fullUrl).toPromise().then((res: any) => {
                resolve(res);
            }).catch(err => reject(null));
        });
    }

    createCurrency(data: any) {
        return new Promise<any>((resolve, reject) => {
            this.http.post('/currency', data).toPromise().then(() => {
                resolve(true);
            }).catch(err => reject(err));
        });
    }

    updateCurrency(id: string | number, data: any) {
        return new Promise<any>((resolve, reject) => {
            this.http.put(`/currency/${id}`, data).toPromise().then(() => {
                resolve(true);
            }).catch(err => reject(err));
        });
    }

    deleteCurrency(id: string | number) {
        return new Promise<boolean>((resolve, reject) => {
            this.http.delete(`/currency/${id}`).toPromise().then(() => {
                resolve(true);
            }).catch(err => resolve(false));
        });
    }

    getAllRealCrypto() {
        return new Promise<void>((resolve, reject) => {
            this.http.getRealCryptos().toPromise().then((res: any) => {
                for (const key of Object.keys(res.Data)) {
                    this.realCryptos.push(new RealCrypto(res.Data[key]));
                }

                this.prepareControl();
                this.loadingServ.loadingRealCryptos = false;
                resolve();
            }).catch(err => reject(null));
        });
    }

    private prepareControl() {
        this.realCryptoControl.enable();
        this.filteredRealCryptos = this.realCryptoControl.valueChanges.pipe(
            startWith(''),
            map(value => this.filterRealCryptos(value))
        );
    }

    private filterRealCryptos(value: any): RealCrypto[] {
      const filterValue = value.fullName ? value.fullName : value.toLowerCase();
      return this.realCryptos.filter(realCrypto => realCrypto.fullName.toLowerCase().includes(filterValue));
    }
    
    getEURValueCripto(cripto: string): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            if (this.criptoValueCache[cripto] === null ||this.criptoValueCache[cripto] === undefined ) {
                this.http.getCryptoValue(cripto).toPromise().then((res: any) => {
                    // console.log("getEURValueCripto", res);
                    if (res.EUR !== undefined) {
                        this.criptoValueCache[cripto] = res.EUR;
                    } else {
                        console.warn(`getEURValueCripto > crypto ${cripto} not found`);
                        this.criptoValueCache[cripto] = 0;
                    }
                    resolve(this.criptoValueCache[cripto]);
                }).catch(err => reject(err));
            } else {
                resolve(this.criptoValueCache[cripto]);
            }
        });
    }
}