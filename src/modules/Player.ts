import { Dice } from "./Dice";
import { INITIAL_NB_DICES } from "./defs";

export class Player {

    constructor(
        public name: string,
        public socketId: string,
        public dices: Dice[] = Array(INITIAL_NB_DICES).fill('').map(e => new Dice())
    ){}

    roll(){
        this.dices.forEach(d => d.roll())
    }

    getDicesValues(){
        return this.dices.map(d => d.value)
    }

    loseDice(){
        this.dices = this.dices.slice(1)
    }

    winDiceIfPossible(){
        if(this.nbDices < INITIAL_NB_DICES){
            this.dices = [...this.dices, new Dice()]
        }
    }

    isDead(){
        return this.nbDices === 0
    }
    isAlive(){
        return !this.isDead()
    }

    isEqual(p: Player){
        return p.socketId === this.socketId
    }

    get nbDices(){
        return this.dices.length
    }

}