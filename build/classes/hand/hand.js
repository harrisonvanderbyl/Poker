"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var finger_1 = require("../fingers/finger");
var Hand = /** @class */ (function () {
    function Hand(data) {
        this._fingers = [];
        console.log(data);
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var part = data_1[_i];
            this._fingers.push(new finger_1.Finger(part));
        }
        console.log(this.value);
    }
    Object.defineProperty(Hand.prototype, "fingers", {
        get: function () {
            return this._fingers;
        },
        enumerable: true,
        configurable: true
    });
    Hand.getMedianMax = function (fingers) {
        var cards = fingers.reduce(function (cards, x) {
            if (!cards[x.value]) {
                cards[x.value] = 1;
            }
            else {
                cards[x.value] += 1;
            }
            return cards;
        }, {});
        var medianAmount = Math.max.apply(Math, (Object.values(cards)).map(function (a) { return Number(a); }));
        switch (medianAmount) {
            case 1: {
                return Math.max.apply(Math, (Object.keys(cards)).map(function (a) { return Number(a); }));
            }
            case 2: {
                var kards = Object.keys(cards).filter(function (a) { return cards[a] != 1; });
                return Math.max.apply(Math, (kards).map(function (a) { return Number(a); }));
            }
            default: {
                for (var _i = 0, _a = Object.keys(cards); _i < _a.length; _i++) {
                    var c = _a[_i];
                    if (cards[c] == medianAmount) {
                        return c;
                    }
                }
            }
        }
        return 0;
    };
    Hand.biteBigOneOff = function (fingers) {
        var index = this.getMedianMax(fingers);
        return fingers.filter(function (c, a) { return c.value != index; });
    };
    Hand.prototype.countCardDupes = function () {
        var v = {};
        for (var _i = 0, _a = this._fingers; _i < _a.length; _i++) {
            var card = _a[_i];
            if (typeof v[card.value] != "undefined") {
                v[card.value] += 1;
            }
            else {
                v[card.value] = 0;
            }
        }
        var values = Object.values(v);
        switch (Object.keys(v).length) {
            case 5: return 1;
            case 4: return 2;
            case 2: return 8 - Math.min.apply(Math, values);
            case 3: return 2 + (Math.max.apply(Math, values));
            default: return 1;
        }
    };
    Hand.getMax = function (fings) {
        return Math.max.apply(Math, fings.map(function (a) { return a.value; }));
    };
    Object.defineProperty(Hand.prototype, "isFlush", {
        get: function () {
            var suits = this._fingers.reduce(function (map, obj) { return (map[obj.suit] = 1, map); }, {});
            if (Object.keys(suits).length == 1) {
                return 6;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hand.prototype, "isStraight", {
        get: function () {
            var vals = this._fingers.map(function (a) { return a.value; });
            if (Math.max.apply(Math, vals) - Math.min.apply(Math, vals) == 4) {
                return 5;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hand.prototype, "value", {
        get: function () {
            return this.rank;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hand.prototype, "rank", {
        get: function () {
            var dupevals = this.countCardDupes(); // rank 1,2,3,4,7,8
            if (dupevals > 1) { //ranks 2,3,4,7,8 are mutually incompatiple with other ranks
                return dupevals;
            }
            var fval = this.isStraight + this.isFlush;
            if (fval > 4 && fval < 10) { //ranks 5 and 6
                return fval;
            }
            console.log(fval);
            if (fval > 0) {
                if (Hand.getMax(this.fingers) == 14) {
                    return 10; // rank 10
                }
                return 9; //rank 9
            }
            else {
                return 1; // Rank 1
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Hand.isbigger = function (theirfingers, myfingers) {
        console.log("MedianMax Of H1:" + Hand.getMedianMax(theirfingers));
        console.log("MedianMax Of H2:" + Hand.getMedianMax(myfingers));
        if (Hand.getMedianMax(theirfingers) < Hand.getMedianMax(myfingers)) {
            return 1;
        }
        if (Hand.getMedianMax(theirfingers) > Hand.getMedianMax(myfingers)) {
            return 0;
        }
        return (Hand.isbigger(Hand.biteBigOneOff(theirfingers), Hand.biteBigOneOff(myfingers)));
    };
    return Hand;
}());
exports.Hand = Hand;
