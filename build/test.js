"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tests_1 = require("./classes/tests/tests");
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function test() {
    rl.question("Test For What Style 1-10", function (style) {
        tests_1.Tests.checkStyle(Number(style));
        test();
    });
}
test();
