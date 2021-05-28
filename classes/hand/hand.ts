
import { assert } from "console";
import { Card } from "../card/card";

export class Hand {
    private _cards: Card[] = [];
    constructor(data: string[]) {
        assert(data.length==5,"Expected 5 cards, Recieved "+data.length)
        for (let part of data) {
            this._cards.push(new Card(part));
        }
    }
    get cards() {
        return this._cards;
    }
    public static getMedianMax(rawcard: Card[]) {
        //This returns the maximum valued card, from the medain set.
        //First it returns the median value, and if there is multiple median values, then it gets the maximum

        //Reduces hand into a count objects Eg. {AH:4,KD:1} or {2H:2,3D:2,4S:1}
        let cards: any = rawcard.reduce(function (cards: any, x: any) {
            if (!cards[x.value]) {
                cards[x.value] = 1;
            } else {
                cards[x.value] += 1;
            }
            return cards;
        }, {});
        
        //Gets the median card count
        let medianAmount = Math.max(...Object.values(cards).map((a) => Number(a)));


        switch (medianAmount) {
            case 1: {
                //In the case of the maximum median amount being one, there is no duplicates, and the highest value is returned.
                return Math.max(...Object.keys(cards).map((a) => Number(a)));
            }
            case 2: {
                //In the case of the median amount being 2, the lower cards are filtered out and the result filtered, and the Maximum returned.
                let kards = Object.keys(cards).filter((a) => {
                    return cards[a] != 1;
                });
                return Math.max(...kards.map((a) => Number(a)));
            }
            default: {
                //In the case of 3 or more cards being the same, that card is deemed maximum value and returned.
                for (let c of Object.keys(cards)) {
                    if (cards[c] == medianAmount) {
                        return c;
                    }
                }
            }
        }
        
        return 0;
    }
    //Remove the Median Maximum Card
    public static removeMedianMax(cards: any) {
        let index = this.getMedianMax(cards);

        return cards.filter((c: any, a: any) => {
            return c.value != index;
        });
    }

    public static isBigger = (theircards: Card[], mycards: Card[]): number => {
        if (Hand.getMedianMax(theircards) < Hand.getMedianMax(mycards)) {
            return 1;
        }
        if (Hand.getMedianMax(theircards) > Hand.getMedianMax(mycards)) {
            return -1;
        }
        if(theircards.length == 0){
            return 0; //Both hands have exactly same face value
        }
        return Hand.isBigger(
            Hand.removeMedianMax(theircards),
            Hand.removeMedianMax(mycards)
        );
    };

    private countCardDupes() { //Returns the rank if a Hand contains Duplicates, otherwise returns 1
        let v: any = {};
        for (let card of this._cards) {
            if (typeof v[card.value] != "undefined") {
                v[card.value] += 1;
            } else {
                v[card.value] = 0;
            }
        }
        let values: number[] = Object.values(v);

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
                throw("Somethings Gone Terribly Wrong")
        }
    }
    public static getMax(fings: Card[]) {
        return Math.max(...fings.map((a) => a.value));
        //Finds the max card value in a hand
    }
    get isFlush() { //Returns rank 6 if flush
        let suits = this._cards.reduce(
            (map: any, obj) => ((map[obj.suit] = 1), map),
            {}
        );
        if (Object.keys(suits).length == 1) {
            return 6;
        }
        return 0;
    }

    get isStraight() { //Returns Rank 5 if flush
        let vals = this._cards.map((a) => a.value);
        if (Math.max(...vals) - Math.min(...vals) == 4) {
            return 5;
        }
        return 0;
    }

    get rank() {
        let dupevals = this.countCardDupes(); // rank 1,2,3,4,7,8
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
