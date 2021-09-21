import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { baseUrl } from 'src/shared/variables';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    constructor(private http: HttpClient) { }

    getHeaders(): HttpOptions {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    get(url: string): Observable<any> {
        return this.http.get(baseUrl + url, this.getHeaders());
    }

    put(url: string, data: any): Observable<any> {
        return this.http.put(baseUrl + url, data, this.getHeaders());
    }

    post(url: string, data: any): Observable<any> {
        return this.http.post(baseUrl + url, data, this.getHeaders());
    }

    delete(url: string): Observable<any> {
        return this.http.delete(baseUrl + url, this.getHeaders());
    }

    getCryptoValue(cryto: string) {
        return this.http.get(`https://min-api.cryptocompare.com/data/price?fsym=${cryto}&tsyms=EUR`)
    }

    getRealCryptos() {
        return this.http.get('https://min-api.cryptocompare.com/data/all/coinlist')
    }
}

class HttpOptions {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: "body";
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: "json";
    withCredentials?: boolean;
}