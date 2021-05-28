"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hand_1 = require("../hand/hand");
var noflush = ["C", "H", "C", "H", "C"];
var isflush = ["H", "H", "H", "H", "H"];
var faces = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
function randomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
var Tests = /** @class */ (function () {
    function Tests() {
    }
    Tests.randomNumbers = function (amount, max) {
        if (amount === void 0) { amount = 5; }
        if (max === void 0) { max = 13; }
        var ret = [];
        var _loop_1 = function (u) {
            var ran = faces[randomInteger(0, max)];
            if (ret.find(function (a) {
                return a == ran;
            })) {
            }
            else {
                u++;
                ret.push(ran);
            }
            out_u_1 = u;
        };
        var out_u_1;
        for (var u = 0; u < amount;) {
            _loop_1(u);
            u = out_u_1;
        }
        return ret;
    };
    Tests.createHand = function (rank) {
        //Generates a hand of a particular rank
        switch (rank) {
            case 1: {
                var nums = this.randomNumbers(5);
                var hand = nums.map(function (a, i) {
                    return a + noflush[i];
                });
                return new hand_1.Hand(hand);
            }
            case 2: {
                var nums = this.randomNumbers(4);
                nums.push(nums[1]);
                var hand = nums.map(function (a, i) {
                    return a + noflush[i];
                });
                return new hand_1.Hand(hand);
            }
            case 3: {
                var nums = this.randomNumbers(3);
                nums.push(nums[1]);
                nums.push(nums[0]);
                var hand = nums.map(function (a, i) {
                    return a + noflush[i];
                });
                return new hand_1.Hand(hand);
            }
            case 4: {
                var nums = this.randomNumbers(3);
                nums.push(nums[1]);
                nums.push(nums[1]);
                var hand = nums.map(function (a, i) {
                    return a + noflush[i];
                });
                return new hand_1.Hand(hand);
            }
            case 5: {
                var start = randomInteger(2, 9);
                var nums = [];
                nums.push(faces[start]);
                nums.push(faces[start + 1]);
                nums.push(faces[start + 2]);
                nums.push(faces[start + 3]);
                nums.push(faces[start + 4]);
                var hand = nums.map(function (a, i) {
                    return a + noflush[i];
                });
                return new hand_1.Hand(hand);
            }
            case 6: {
                var nums = this.randomNumbers(5);
                var hand = nums.map(function (a, i) {
                    return a + isflush[i];
                });
                return new hand_1.Hand(hand);
            }
            case 7: {
                var nums = this.randomNumbers(2);
                nums.push(nums[1]);
                nums.push(nums[1]);
                nums.push(nums[0]);
                var hand = nums.map(function (a, i) {
                    return a + noflush[i];
                });
                return new hand_1.Hand(hand);
            }
            case 8: {
                var nums = this.randomNumbers(2);
                nums.push(nums[1]);
                nums.push(nums[1]);
                nums.push(nums[1]);
                var hand = nums.map(function (a, i) {
                    return a + noflush[i];
                });
                return new hand_1.Hand(hand);
            }
            case 9: {
                var start = randomInteger(2, 9);
                var nums = [];
                nums.push(faces[start]);
                nums.push(faces[start + 1]);
                nums.push(faces[start + 2]);
                nums.push(faces[start + 3]);
                nums.push(faces[start + 4]);
                var hand = nums.map(function (a, i) {
                    return a + isflush[i];
                });
                return new hand_1.Hand(hand);
            }
            case 10: {
                var nums = faces.slice(-5);
                var hand = nums.map(function (a, i) {
                    return a + isflush[i];
                });
                return new hand_1.Hand(hand);
            }
            default: {
                return new hand_1.Hand([]);
            }
        }
    };
    Tests.checkCompare = function (style, amount) {
        if (style === void 0) { style = randomInteger(1, 10); }
        if (amount === void 0) { amount = 100; }
        //TODO Finish this test
        for (var u = 0; u < amount; u++) {
            var h1 = this.createHand(style);
            var newcards = h1.cards.map(function (a) { return a.raw; });
            var h2 = new hand_1.Hand(newcards);
        }
    };
    Tests.checkStyle = function (style, amount) {
        if (style === void 0) { style = randomInteger(1, 10); }
        if (amount === void 0) { amount = 100; }
        //Generates styles and checks them. NOTE: Rank 1 can sometimes generate rank 5(Straight) cards if the stars align
        for (var u = 0; u < amount; u++) {
            var h = this.createHand(style);
            var rank = h === null || h === void 0 ? void 0 : h.rank;
            if (rank != style) {
                console.log("error!");
                console.log(h === null || h === void 0 ? void 0 : h.cards);
                console.log("Expected:" + style);
                console.log("Returned:" + rank);
            }
            else {
                console.log("Passed");
            }
        }
    };
    return Tests;
}());
exports.Tests = Tests;
