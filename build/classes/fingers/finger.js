"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Finger = /** @class */ (function () {
    function Finger(data) {
        this._suit = data[1];
        this._number = data[0];
        this._raw = data;
    }
    Object.defineProperty(Finger.prototype, "raw", {
        get: function () {
            return this._raw;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Finger.prototype, "suit", {
        get: function () {
            return this._suit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Finger.prototype, "value", {
        get: function () {
            switch (this._number) {
                case "A": return 14;
                case "K": return 13;
                case "Q": return 12;
                case "J": return 11;
                case "T": return 10;
                default: return Number(this._number);
            }
        },
        enumerable: true,
        configurable: true
    });
    return Finger;
}());
exports.Finger = Finger;
