import { assert } from "console";
import { Hand } from "./classes/hand/hand";

const readable = process.stdin;
const chunks: any = [];

//Get all data from stream
readable.on("readable", () => {
  let chunk;
  while (null !== (chunk = readable.read())) {
    chunks.push(chunk);
  }
});

//Combine data into classes
readable.on("end", () => {
  const content = chunks.join("");

  let handArray = content.split("\n");
  let p1wins = 0;
  let p2wins = 0;
  let ties = 0;
  for (let hand of handArray) {
    let pieces = hand.split(" ");
    assert(pieces.length == 10,"Error, Expected 10 cards, Recieved "+pieces.length)
    let p1 = new Hand(pieces.slice(0, 5));
    let p2 = new Hand(pieces.slice(5));
    if (p1.rank > p2.rank) {
      p1wins += 1;
    }
    if (p1.rank < p2.rank) {
      p2wins += 1;
    }
    if (p1.rank == p2.rank) {
      let tiebreaker = Hand.isBigger(p2.cards, p1.cards);
      if (tiebreaker == 1) {
        p1wins += 1;
      } 
      if(tiebreaker == -1){
        p2wins += 1;
      }
      if(tiebreaker == 0){
         ties += 1;
      }
    }
  }
  console.log("Player 1: "+p1wins);
  console.log("Player 2: "+p2wins);
  if(ties > 0){
   console.log("Ties (Both hands have the same face cards): "+ties);
  }
});
