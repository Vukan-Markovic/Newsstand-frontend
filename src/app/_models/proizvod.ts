import { Proizvodjac } from './proizvodjac';
import { VrstaProizvoda } from './vrstaProizvoda';

export class Proizvod {
    proizvodID: number;
    nazivProizvoda: string;
    opisProizvoda: string;
    cena: number;
    tipPakovanja: string;
    velicinaPakovanja: string;
    barKod: string;
    masa: number;
    raspolozivaKolicina: number;
    proizvodjac: Proizvodjac;
    vrstaProizvoda: VrstaProizvoda;
}

/*
export class Book {
    title: string;
    price: number;
    genre: string;
    author: string;
    image: string;
    about?: string;
    username?: string;
    publishDate?: Date;
    userId?: string;
    userBuyerId?: string;
    bookId?: string;
    solded?: boolean;

    constructor(title: string, price: number, genre: string, author: string, image: string, about?: string,
                username?: string, publishDate?: Date, userId?: string, userBuyerId?: string, bookId?: string, solded?: boolean) {
        this.title = title;
        this.price = price;
        this.genre = genre;
        this.author = author;
        this.image = image;
        this.about = about;
        this.username = username;
        this.publishDate = publishDate;
        this.userId = userId;
        this.userBuyerId = userBuyerId;
        this.bookId = bookId;
        this.solded = solded;
    }
}
*/