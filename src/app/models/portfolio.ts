import { Currency } from "./currency";

export class Portfolio {
    id?: number;
    name: string;
    eurValue?: number = null;
    portLines?: PortfolioLine[];
    _links?: {
      self: {
        href: string
      },
      portfolio: {
        href:  string
      },
      lines: {
        href:  string
      }
    }

    constructor(data?: any) {
        Object.assign(this, data);
    }
}

export class PortfolioLine {
  id?: number = null;
  amount: number = 0;
  currency: Currency = null;
  _links?: {
    self: {
      href: string
    },
    portfolioLine: {
      href: string
    },
    portfolio: {
      href: string
    },
    currency: {
      href: string
    }
  }

  constructor(data?: any, currency?: Currency) {
      Object.assign(this, data);
      this.currency = currency;
  }
}