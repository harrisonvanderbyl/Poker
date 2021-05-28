"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Card = /** @class */ (function () {
    function Card(data) {
        this._suit = data[1];
        this._number = data[0];
        this._raw = data;
    }
    Object.defineProperty(Card.prototype, "raw", {
        get: function () {
            return this._raw;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "suit", {
        get: function () {
            return this._suit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "value", {
        get: function () {
            switch (this._number) {
                case "A":
                    return 14;
                case "K":
                    return 13;
                case "Q":
                    return 12;
                case "J":
                    return 11;
                case "T":
                    return 10;
                default:
                    return Number(this._number);
            }
        },
        enumerable: true,
        configurable: true
    });
    return Card;
}());
exports.Card = Card;
