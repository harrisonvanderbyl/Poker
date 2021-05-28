"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var console_1 = require("console");
var card_1 = require("../card/card");
var Hand = /** @class */ (function () {
    function Hand(data) {
        this._cards = [];
        console_1.assert(data.length == 5, "Expected 5 cards, Recieved " + data.length);
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
        //I wish I knew what I did here. Looking at this is giving me a headache.
        //This returns the maximum valued card, from the medain set.
        //First it returns the median value, and if there is multiple median values, then it gets the maximum
        //Reduces hand into a count objects Eg. {AH:4,KD:1} or {2H:2,3D:2,4S:1}
        var cards = rawcard.reduce(function (cards, x) {
            if (!cards[x.value]) {
                cards[x.value] = 1;
            }
            else {
                cards[x.value] += 1;
            }
            return cards;
        }, {});
        //Gets the median card count
        var medianAmount = Math.max.apply(Math, Object.values(cards).map(function (a) { return Number(a); }));
        switch (medianAmount) {
            case 1: {
                //In the case of the maximum median amount being one, there is no duplicates, and the highest value is returned.
                return Math.max.apply(Math, Object.keys(cards).map(function (a) { return Number(a); }));
            }
            case 2: {
                //In the case of the median amount being 2, the lower cards are filtered out and the result filtered, and the Maximum returned.
                var kards = Object.keys(cards).filter(function (a) {
                    return cards[a] != 1;
                });
                return Math.max.apply(Math, kards.map(function (a) { return Number(a); }));
            }
            default: {
                //In the case of 3 or more cards being the same, that card is deemed maximum value and returned.
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
    //Remove the Median Maximum Card
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
                throw ("Somethings Gone Terribly Wrong");
        }
    };
    Hand.getMax = function (fings) {
        return Math.max.apply(Math, fings.map(function (a) { return a.value; }));
        //Finds the max card value in a hand
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
            return -1;
        }
        if (theircards.length == 0) {
            return 0; //Both hands have exactly same face value
        }
        return Hand.isBigger(Hand.removeMedianMax(theircards), Hand.removeMedianMax(mycards));
    };
    return Hand;
}());
exports.Hand = Hand;
