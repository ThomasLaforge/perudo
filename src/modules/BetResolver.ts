import { Player } from "./Player";
import { DiceValue, Paco } from "./defs";

export class BetResolver {

    constructor(
        public number: number,
        public value: number,
        public isPalifico: boolean,
        public exactMode = false,
        public betPlayer: Player,
        public contestator: Player,
        public dicesValues: DiceValue[] 
    ){}

    isExact(){
        const betNumber = this.number
        const realNumber = this.getNumberOfDiceForBetDiceValue()
        return realNumber === betNumber
    }

    isRespected(){
        const betNumber = this.number
        const realNumber = this.getNumberOfDiceForBetDiceValue()
        return realNumber >= betNumber
    }

    getNumberOfDiceForBetDiceValue(){
        return this.dicesValues.filter(dValue => 
            dValue === this.value || (!this.isPalifico && dValue === Paco) 
        ).length
    }

}