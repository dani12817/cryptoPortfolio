import { MatDialogConfig } from "@angular/material/dialog";

export var actionDialogConfig: MatDialogConfig = {
    disableClose: true,
    maxWidth: '360px',
    width: '360px'
};

export const portfolioUrl = 'http://localhost:8080/api/portfolio/';
export const currencyUrl = 'http://localhost:8080/api/currency/';
export const baseUrl: string = "https://sheltered-cliffs-34052.herokuapp.com/api";