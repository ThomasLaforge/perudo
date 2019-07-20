import { Player } from "./Player";
import { Bet, Rules, Rule, Paco, BetComplete, BetContested, DiceValue } from "./defs";
import { BetResolver } from "./BetResolver";

export class Game {

    constructor(
        public players: Player[],
        public currentBet: Bet | null = null,
        public currentPlayerIndex: number = 0,
        public history: BetComplete[] = [],
        public specialRules: Rules = [],
        public inPalifico = false // True if last loser newly has only one dice
    ){}

    addBet(player: Player, value: number, number: number){
        const newBet: Bet = { player, value, number }
        this.currentBet = newBet
        this.nextPlayer()
    }

    constest(contestator: Player, exactAsked = false){
        if(!this.currentBet){
            throw "can't contest if no bet"
        }

        const betResolver = this.getCurrentBetResolver(contestator, exactAsked)

        const exactPossible = this.specialRules.includes(Rule.Exact)
        if(exactAsked && exactPossible){
            const betIsExact = betResolver.isExact()
            if(betIsExact){
                contestator.winDiceIfPossible()
            }
            else {
                contestator.loseDice()
            }
        }
        else {
            const betRespected = betResolver.isRespected()
            if(betRespected){
                contestator.loseDice()
            }
            else {
                this.currentBet.player.loseDice()
            }
        }

        this.nextTurn({})
    }

    nextPlayer(){
        this.currentPlayerIndex++
        if(this.currentPlayerIndex === this.nbPlayers){
            this.currentPlayerIndex = 0
        }
        if(this.players[this.currentPlayerIndex].isDead()){
            this.nextPlayer()
        }
    }

    // TODO : remove type any on result
    nextTurn(result: any){
        // TODO : replace good loser player
        const loser: Player = this.players[0]
        
        // set first player (loser become first)
        const loserIndex = this.getPlayerIndex(loser)
        this.currentPlayerIndex = loserIndex

        if(loser.isDead() && !this.isGameOver()){
            this.nextPlayer()
        }
        // reset bet
        this.currentBet = null
        // check palifico
        this.inPalifico = loser.nbDices === 1
    }

    get nbPlayers(){
        return this.players.length
    }

    get allDiceValues(){
        return this.players.reduce( (allDices: DiceValue[], p) => allDices.concat(p.getDicesValues()), [])
    }

    isGameOver(){
        return this.players.filter(p => p.isAlive()).length === 1
    }

    getPlayerIndex(player: Player){
        return this.players.findIndex(p => p.isEqual(player))
    }

    getCurrentBetResolver(contestator: Player, exactMode: boolean){
        if(!this.currentBet){
            throw "no current bet"
        }

        return new BetResolver(
            this.currentBet.number,
            this.currentBet.value,
            this.inPalifico,
            exactMode,
            this.currentBet.player,
            contestator,
            this.allDiceValues
        )
    }

    getWinner(){
        return this.players.find(p => p.isAlive())
    }
    getLosers(){
        return this.players.filter(p => p.isDead())
    }
}