import { assert } from "console";
import { Tests } from "./classes/tests/tests";

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
function test() {
  rl.question("Generate hands of a particular Rank, Then test the discriminator. Test For What Rank (1-10) : ", function (style: any) {
    assert(style >= 1 && style <= 10, "Please enter a number between 1 and 10");
    if (style >= 1 && style <= 10) {
      rl.question("How many tests would you like to run?: ", function (amount: any) {
        assert(amount > 0, "Please Choose A Valid Number");
        if (style > 0) {
          Tests.checkStyle(Number(style), Number(amount));
          
        } 
          test();
        
      });
    }
    test();
  });
}
test();
