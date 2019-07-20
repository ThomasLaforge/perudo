import { Player } from "./Player";

export const INITIAL_NB_DICES = 5
export const Paco = 1

export type DiceValue = 1 | 2 | 3| 4 | 5 | 6

export interface Bet {
    player: Player,
    value: number,
    number: number
}

export interface BetContested extends Bet {
    contestator: Player,
    exact?: boolean
}

export interface BetComplete extends BetContested {
    globalRoll: {player: Player, dices: DiceValue[]}[]
}

export enum Rule {
    Exact
}

export type Rules = Rule[]