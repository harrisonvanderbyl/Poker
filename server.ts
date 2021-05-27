import { Hand } from "./classes/hand/hand";


const readable = process.stdin;
const chunks:any = [];

//Get all data from stream
readable.on('readable', () => {
  let chunk;
  while (null !== (chunk = readable.read())) {
    chunks.push(chunk);
  }
});

//Combine data into classes
readable.on('end', () => {
  const content = chunks.join('');

  

  
  var handArray = content.split("\n")
  var p1wins = 0;
  var p2wins = 0;
  for(let hand of handArray){
     var pieces = hand.split(" ");
     var p1 = new Hand(pieces.slice(0,5))
     var p2 = new Hand(pieces.slice(5))
     if(p1.rank > p2.rank){
        console.log("P1")
        p1wins += 1;

     }
     if(p1.rank < p2.rank){
      console.log("P2")
      p2wins += 1;

    }
    if(p1.value == p2.value){
      console.log("same")
      if(Hand.isbigger(p2.fingers,p1.fingers)){
         p1wins += 1;
         console.log("P1")
      }else{
         p2wins += 1;
         console.log("P2")
      }}
  }
  console.log(p1wins,p2wins)
});