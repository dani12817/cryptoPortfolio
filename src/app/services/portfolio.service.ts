import { Injectable } from '@angular/core';

import { HttpService } from './http.service';

import { Portfolio, PortfolioLine } from 'src/app/models/portfolio';
import { CurrencyService } from './currency.service';
import { Currency } from '../models/currency';

@Injectable({providedIn: 'root'})
export class PortfolioService {

    constructor(private http: HttpService, private currencyServ: CurrencyService) { }
    
    getPortfolioList(): Promise<Portfolio[]> {
        return new Promise<Portfolio[]>((resolve, reject) => {
            this.http.get("/portfolio").toPromise().then((res: any) => {
                // console.log("getPortfolioList", res._embedded.portfolios);

                let portfolios: Portfolio[] = [];
                for (const portfolio of res._embedded.portfolios) {
                    portfolios.push(new Portfolio(portfolio));
                }

                resolve(portfolios);
            }).catch(err => reject(err));
        });
    }
    
    getPortfolio(id: string | number): Promise<Portfolio> {
        return new Promise<Portfolio>((resolve, reject) => {
            this.http.get(`/portfolio/${id}`).toPromise().then((res: any) => {
                // console.log("getPortfolio", res);
                resolve(new Portfolio(res));
            }).catch(err => reject(err));
        });
    }

    createPortfolio(data: any) {
        return new Promise<any>((resolve, reject) => {
            this.http.post('/portfolio', data).toPromise().then((res) => {
                resolve(res);
            }).catch(err => reject(err));
        });
    }

    updatePortfolio(id: string | number, data: any) {
        return new Promise<any>((resolve, reject) => {
            this.http.put(`/portfolio/${id}`, data).toPromise().then(() => {
                resolve(true);
            }).catch(err => reject(err));
        });
    }

    deletePortfolio(id: string | number) {
        return new Promise<boolean>((resolve, reject) => {
            this.http.delete(`/portfolio/${id}`).toPromise().then(() => {
                resolve(true);
            }).catch(err => resolve(false));
        });
    }
    
    getPortfolioLines(id: string | number): Promise<PortfolioLine[]> {
        return new Promise<PortfolioLine[]>((resolve, reject) => {
            this.http.get(`/portfolio/${id}/lines`).toPromise().then((res: any) => {
                let portfolioLinePromises: Promise<Currency>[] = [];
                for (let portfolioLine of res._embedded.portfolioLines) {
                    portfolioLinePromises.push(this.currencyServ.getCurrency(portfolioLine._links.currency.href, true));
                }

                let portLines: PortfolioLine[] = res._embedded.portfolioLines;
                Promise.all(portfolioLinePromises).then(values => {

                    for (let i = 0; i < values.length; i++) {
                        portLines[i].currency = values[i];
                    }

                    resolve(portLines);
                });
            }).catch(err => reject(err));
        });
    }

    createPortfolioLine(data: any) {
        return new Promise<any>((resolve, reject) => {
            this.http.post('/portfolioline', data).toPromise().then(() => {
                console.log("createPortfolioLine created");
                resolve(true);
            }).catch(err => reject(err));
        });
    }

    updatePortfolioLine(id: string | number, data: any) {
        return new Promise<any>((resolve, reject) => {
            this.http.put(`/portfolioline/${id}`, data).toPromise().then(() => {
                console.log("updatePortfolioLine created");
                resolve(true);
            }).catch(err => reject(err));
        });
    }

    deletePortfolioLine(id: string | number) {
        return new Promise<boolean>((resolve, reject) => {
            this.http.delete(`/portfolioline/${id}`).toPromise().then(() => {
                console.log("deletePortfolioLine deleted", id);
                resolve(true);
            }).catch(err => resolve(false));
        });
    }
}