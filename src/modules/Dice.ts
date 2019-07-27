import { DiceValue } from "./defs";

export class Dice {

    public value: DiceValue

    constructor(
        value?: DiceValue,
        autoRoll = true
    )
    {
        if(!value || autoRoll){
            this.value = this.getNewRollValue()
        }
        else {
            this.value = value
        }
    }


    getNewRollValue() {
        this.roll()
        return this.value
    }

    roll(){
        this.value = Math.floor(Math.random() * 6 + 1) as DiceValue
    }
}