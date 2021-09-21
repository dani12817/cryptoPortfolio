export class Currency {
    id?: number;
    acronym: string;
    name: string;
    eurValue?: number;
    _links?: {
        self: {
            href: string;
        },
        currency: {
            href: string;
        }
    }
}

export class RealCrypto {
    CoinName: string;
    Name: string;
    ImageUrl: string;
    fullName: string;

    constructor(data?: any) {
        this.CoinName = data.CoinName;
        this.Name = data.Name;
        this.ImageUrl = data.ImageUrl;
        this.fullName =`${this.CoinName} (${this.Name})`
    }
}
