"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var console_1 = require("console");
var Card = /** @class */ (function () {
    function Card(data) {
        console_1.assert(typeof data == "string", "Card requires a valid String in the format 'AH', Recieved data with the type of " + typeof data);
        console_1.assert(data.length == 2, "Card has invalid length, Eg.. Write 10 as T and Hearts as H");
        console_1.assert(data[1].match(/H|D|S|C/), "Valid suits are H,D,S,C Recieved " + data[1]);
        console_1.assert(data[0].match(/2|3|4|5|6|7|8|9|T|J|K|Q|A/), "Invalid Number, Valid Numbers are 2,3,4,5,6,7,8,9,T,J,Q,K, Recieved " + data[0]);
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
