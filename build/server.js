"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hand_1 = require("./classes/hand/hand");
var readable = process.stdin;
var chunks = [];
//Get all data from stream
readable.on("readable", function () {
    var chunk;
    while (null !== (chunk = readable.read())) {
        chunks.push(chunk);
    }
});
//Combine data into classes
readable.on("end", function () {
    var content = chunks.join("");
    var handArray = content.split("\n");
    var p1wins = 0;
    var p2wins = 0;
    for (var _i = 0, handArray_1 = handArray; _i < handArray_1.length; _i++) {
        var hand = handArray_1[_i];
        var pieces = hand.split(" ");
        var p1 = new hand_1.Hand(pieces.slice(0, 5));
        var p2 = new hand_1.Hand(pieces.slice(5));
        if (p1.rank > p2.rank) {
            p1wins += 1;
        }
        if (p1.rank < p2.rank) {
            p2wins += 1;
        }
        if (p1.rank == p2.rank) {
            if (hand_1.Hand.isBigger(p2.cards, p1.cards)) {
                p1wins += 1;
            }
            else {
                p2wins += 1;
            }
        }
    }
    console.log("Player 1: " + p1wins);
    console.log("Player 2: " + p2wins);
});
