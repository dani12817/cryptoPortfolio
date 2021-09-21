import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class LoadingService {
    loading: boolean = false;
    loadingPortLines: boolean = false;
    actionInProgress: boolean = false;

    loadingRealCryptos: boolean = false;
}