import { Finger } from "../fingers/finger";

export class Hand{
    private _fingers:Finger[] = [];
    constructor(data:string[]){
        console.log(data)
        for(let part of data){
            this._fingers.push(new Finger(part))
        }
        console.log(this.value)
    }
    get fingers(){
        return this._fingers;
    }
    public static getMedianMax(fingers:any){
        let cards:any = fingers.reduce(function(cards:any, x:any) {
            if(!cards[x.value]){
                cards[x.value] = 1
            }else{
                cards[x.value] += 1
            }
            return cards;
        }, {})
        let medianAmount = Math.max(...(Object.values(cards)).map(a=>Number(a)))
        switch(medianAmount){
            case 1:{
                return Math.max(...(Object.keys(cards)).map(a=>Number(a)))
            }
            case 2:{
                let kards = Object.keys(cards).filter((a)=>{return cards[a]!=1})
                return Math.max(...(kards).map(a=>Number(a)))
            }
            default:{
                for(let c of Object.keys(cards)){
                    if(cards[c]==medianAmount){
                        return c;
                    }
                }
            }
        }
        return 0

    }
    public static biteBigOneOff(fingers:any){
        var index = this.getMedianMax(fingers)
        
        return fingers.filter((c:any,a:any)=>{return c.value!=index});
    }
    
    public static isbigger = (theirfingers:any,myfingers:any):number=>{
        console.log("MedianMax Of H1:"+Hand.getMedianMax(theirfingers))
        console.log("MedianMax Of H2:"+Hand.getMedianMax(myfingers))
        if(Hand.getMedianMax(theirfingers)<Hand.getMedianMax(myfingers)){
            return 1;
        }
        if(Hand.getMedianMax(theirfingers)>Hand.getMedianMax(myfingers)){
            return 0;
        }
        return (Hand.isbigger(Hand.biteBigOneOff(theirfingers),Hand.biteBigOneOff(myfingers)));
    }
    private countCardDupes(){
        let v:any = {};
        for(let card of this._fingers){
            if(typeof v[card.value] != "undefined"){
                v[card.value] +=1;
            }else{
                v[card.value] = 0;
            }
        }
        var values:number[] = Object.values(v);
        
        switch(Object.keys(v).length){
            case 5: return 1;
            case 4: return 2 ;
            case 2: return 8-Math.min(...values);
            case 3: return 2+(Math.max(...values)) ;
            default:return 1;
        }

    }
    public static getMax(fings:Finger[]){
        return Math.max(...fings.map(a=>a.value));
    }
    get isFlush(){
        var suits = this._fingers.reduce((map:any, obj) => (map[obj.suit] = 1, map), {});
        if(Object.keys(suits).length == 1){
            return 6;
        }
        return 0;
    }

    get isStraight(){
        let vals = this._fingers.map(a=>a.value);
        if(Math.max(...vals)-Math.min(...vals)==4){
            return 5;
        }
        return 0;
    }
    get value(){
        return this.rank;
    }
    get rank(){
        var dupevals = this.countCardDupes(); // rank 1,2,3,4,7,8
        if(dupevals>1){ //ranks 2,3,4,7,8 are mutually incompatiple with other ranks
            return dupevals;
        }
        let fval = this.isStraight + this.isFlush;
        if(fval > 4 && fval < 10){//ranks 5 and 6
            return fval 
        }
        console.log(fval)
        if(fval>0){
            if(Hand.getMax(this.fingers) == 14){
                return 10; // rank 10
            }

            return 9 ;//rank 9
        }else{
            return 1 // Rank 1
        }

    }

}