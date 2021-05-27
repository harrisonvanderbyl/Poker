
import { Tests } from "./classes/tests/tests";

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function test(){
rl.question("Test For What Style 1-10", function(style:any) {
   Tests.checkStyle(Number(style))
   test()
})}
test()
