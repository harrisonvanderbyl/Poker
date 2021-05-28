"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var card_1 = require("../card/card");
var Hand = /** @class */ (function () {
    function Hand(data) {
        this._cards = [];
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var part = data_1[_i];
            this._cards.push(new card_1.Card(part));
        }
    }
    Object.defineProperty(Hand.prototype, "cards", {
        get: function () {
            return this._cards;
        },
        enumerable: true,
        configurable: true
    });
    Hand.getMedianMax = function (rawcard) {
        var cards = rawcard.reduce(function (cards, x) {
            if (!cards[x.value]) {
                cards[x.value] = 1;
            }
            else {
                cards[x.value] += 1;
            }
            return cards;
        }, {});
        var medianAmount = Math.max.apply(Math, Object.values(cards).map(function (a) { return Number(a); }));
        switch (medianAmount) {
            case 1: {
                return Math.max.apply(Math, Object.keys(cards).map(function (a) { return Number(a); }));
            }
            case 2: {
                var kards = Object.keys(cards).filter(function (a) {
                    return cards[a] != 1;
                });
                return Math.max.apply(Math, kards.map(function (a) { return Number(a); }));
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
    Hand.removeMedianMax = function (cards) {
        var index = this.getMedianMax(cards);
        return cards.filter(function (c, a) {
            return c.value != index;
        });
    };
    Hand.prototype.countCardDupes = function () {
        var v = {};
        for (var _i = 0, _a = this._cards; _i < _a.length; _i++) {
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
            case 5:
                return 1;
            case 4:
                return 2;
            case 2:
                return 8 - Math.min.apply(Math, values);
            case 3:
                return 2 + Math.max.apply(Math, values);
            default:
                return 1;
        }
    };
    Hand.getMax = function (fings) {
        return Math.max.apply(Math, fings.map(function (a) { return a.value; }));
    };
    Object.defineProperty(Hand.prototype, "isFlush", {
        get: function () {
            var suits = this._cards.reduce(function (map, obj) { return ((map[obj.suit] = 1), map); }, {});
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
            var vals = this._cards.map(function (a) { return a.value; });
            if (Math.max.apply(Math, vals) - Math.min.apply(Math, vals) == 4) {
                return 5;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hand.prototype, "rank", {
        get: function () {
            var dupevals = this.countCardDupes(); // rank 1,2,3,4,7,8
            if (dupevals > 1) {
                //ranks 2,3,4,7,8 are mutually incompatiple with other ranks
                return dupevals;
            }
            var fval = this.isStraight + this.isFlush;
            if (fval > 4 && fval < 10) {
                //ranks 5 and 6
                return fval;
            }
            if (fval > 0) {
                if (Hand.getMax(this.cards) == 14) {
                    return 10; // rank 10
                }
                return 9; //rank 9
            }
            else {
                return 1; // Rank 1
            }
        },
        enumerable: true,
        configurable: true
    });
    Hand.isBigger = function (theircards, mycards) {
        if (Hand.getMedianMax(theircards) < Hand.getMedianMax(mycards)) {
            return 1;
        }
        if (Hand.getMedianMax(theircards) > Hand.getMedianMax(mycards)) {
            return 0;
        }
        return Hand.isBigger(Hand.removeMedianMax(theircards), Hand.removeMedianMax(mycards));
    };
    return Hand;
}());
exports.Hand = Hand;
