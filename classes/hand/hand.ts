import { Card } from "../card/card";

export class Hand {
    private _cards: Card[] = [];
    constructor(data: string[]) {
        for (let part of data) {
            this._cards.push(new Card(part));
        }
    }
    get cards() {
        return this._cards;
    }
    public static getMedianMax(rawcard: any) {
        let cards: any = rawcard.reduce(function (cards: any, x: any) {
            if (!cards[x.value]) {
                cards[x.value] = 1;
            } else {
                cards[x.value] += 1;
            }
            return cards;
        }, {});
        let medianAmount = Math.max(...Object.values(cards).map((a) => Number(a)));
        switch (medianAmount) {
            case 1: {
                return Math.max(...Object.keys(cards).map((a) => Number(a)));
            }
            case 2: {
                let kards = Object.keys(cards).filter((a) => {
                    return cards[a] != 1;
                });
                return Math.max(...kards.map((a) => Number(a)));
            }
            default: {
                for (let c of Object.keys(cards)) {
                    if (cards[c] == medianAmount) {
                        return c;
                    }
                }
            }
        }
        return 0;
    }

    public static removeMedianMax(cards: any) {
        var index = this.getMedianMax(cards);

        return cards.filter((c: any, a: any) => {
            return c.value != index;
        });
    }

    public static isBigger = (theircards: any, mycards: any): number => {
        if (Hand.getMedianMax(theircards) < Hand.getMedianMax(mycards)) {
            return 1;
        }
        if (Hand.getMedianMax(theircards) > Hand.getMedianMax(mycards)) {
            return 0;
        }
        return Hand.isBigger(
            Hand.removeMedianMax(theircards),
            Hand.removeMedianMax(mycards)
        );
    };

    private countCardDupes() {
        let v: any = {};
        for (let card of this._cards) {
            if (typeof v[card.value] != "undefined") {
                v[card.value] += 1;
            } else {
                v[card.value] = 0;
            }
        }
        var values: number[] = Object.values(v);

        switch (Object.keys(v).length) {
            case 5:
                return 1;
            case 4:
                return 2;
            case 2:
                return 8 - Math.min(...values);
            case 3:
                return 2 + Math.max(...values);
            default:
                return 1;
        }
    }
    public static getMax(fings: Card[]) {
        return Math.max(...fings.map((a) => a.value));
    }
    get isFlush() {
        var suits = this._cards.reduce(
            (map: any, obj) => ((map[obj.suit] = 1), map),
            {}
        );
        if (Object.keys(suits).length == 1) {
            return 6;
        }
        return 0;
    }

    get isStraight() {
        let vals = this._cards.map((a) => a.value);
        if (Math.max(...vals) - Math.min(...vals) == 4) {
            return 5;
        }
        return 0;
    }

    get rank() {
        var dupevals = this.countCardDupes(); // rank 1,2,3,4,7,8
        if (dupevals > 1) {
            //ranks 2,3,4,7,8 are mutually incompatiple with other ranks
            return dupevals;
        }
        let fval = this.isStraight + this.isFlush;
        if (fval > 4 && fval < 10) {
            //ranks 5 and 6
            return fval;
        }
        if (fval > 0) {
            if (Hand.getMax(this.cards) == 14) {
                return 10; // rank 10
            }

            return 9; //rank 9
        } else {
            return 1; // Rank 1
        }
    }
}
