
import { Hand } from "../hand/hand";

var noflush = ["C","H","C","H","C"]
var isflush = ["H","H","H","H","H"]
var faces = ["2","3","4","5","6","7","8","9","T","J","Q","K","A"]
function randomInteger(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
  
export class Tests{
    public static randomNumbers(amount:any = 5,max:any = 13){
        var ret:string[] = []
        for(let u = 0 ; u < amount;){
            let ran = faces[randomInteger(0,max)];
            
            if(ret.find((a:any)=>{return a==ran})){

            }else{
                u++;
                ret.push(ran);
            }
        }
        return ret;
    }
    public static createHand(style:any){
        switch(style){
            case 1:{
                let nums = this.randomNumbers(5)
                var hand = nums.map((a,i)=>{return a+noflush[i]})

                return new Hand(hand)
            }
            case 2:{
                let nums = this.randomNumbers(4)
                nums.push(nums[1])
                var hand = nums.map((a,i)=>{return a+noflush[i]})
                return new Hand(hand)
            }
            case 3:{
                let nums = this.randomNumbers(3)
                nums.push(nums[1])
                nums.push(nums[0])
                var hand = nums.map((a,i)=>{return a+noflush[i]})
                return new Hand(hand)
            }
            case 4:{
                let nums = this.randomNumbers(3)
                nums.push(nums[1])
                nums.push(nums[1])
                var hand = nums.map((a,i)=>{return a+noflush[i]})
                return new Hand(hand)
            }
            case 5:{
                let start = randomInteger(2,9)
                let nums:String[] = []
                nums.push(faces[start])
                nums.push(faces[start+1])
                nums.push(faces[start+2])
                nums.push(faces[start+3])
                nums.push(faces[start+4])
                var hand = nums.map((a,i)=>{return a+noflush[i]})
                return new Hand(hand)
            }
            case 6:{
                let nums = this.randomNumbers(5)
                var hand = nums.map((a,i)=>{return a+isflush[i]})
                return new Hand(hand)
            }
            case 7:{
                let nums = this.randomNumbers(2)
                nums.push(nums[1])
                nums.push(nums[1])
                nums.push(nums[0])
                var hand = nums.map((a,i)=>{return a+noflush[i]})
                return new Hand(hand)
            }
            case 8:{
                let nums = this.randomNumbers(2)
                nums.push(nums[1])
                nums.push(nums[1])
                nums.push(nums[1])
                var hand = nums.map((a,i)=>{return a+noflush[i]})
                return new Hand(hand)
            }
            case 9:{
                let start = randomInteger(2,9)
                let nums:String[] = []
                nums.push(faces[start])
                nums.push(faces[start+1])
                nums.push(faces[start+2])
                nums.push(faces[start+3])
                nums.push(faces[start+4])
                var hand = nums.map((a,i)=>{return a+isflush[i]})
                return new Hand(hand)
            }
            case 10:{
                let nums = faces.slice(-5)
                var hand = nums.map((a,i)=>{return a+isflush[i]})
                return new Hand(hand)
            }
            default:{
                return new Hand([])
            }
        }

    }
    public static checkCompare(style=randomInteger(1,10),amount=100){
        for(let u = 0; u < amount;u++){
            let h1 = this.createHand(style)
            let newfingers:string[] = h1.fingers.map(a=>a.raw)
            let h2 = new Hand(newfingers);

            
        } 
    }
    public static checkStyle(style=randomInteger(1,10),amount=100){
        for(let u = 0; u < amount;u++){
            let h = this.createHand(style)
            let rank = h?.rank
            if(rank!=style){
                console.log("error!")
                console.log(h?.fingers)
                console.log("Expected:"+style)
                console.log("Returned:"+rank)
            }else{
                console.log("Passed")
            }
        }

    }
}