
export class Finger {

    private _number:string;
    private _suit:string;
    private _raw:string;
    constructor(data:string){
        this._suit = data[1];
        this._number = data[0];
        this._raw=data;
    }
    get raw(){
        return this._raw;
    }
    get suit(){
        return this._suit;
    }
    get value(){
        
        switch (this._number){
            case "A": return 14;
            case "K": return 13;
            case "Q": return 12;
            case "J": return 11;
            case "T": return 10;
            default : return Number(this._number)
        }

    }
    
}