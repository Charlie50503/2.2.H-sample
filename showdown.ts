import { Card, Player, Game } from "./template";

export enum Suit {
  Club,
  Diamond,
  Heart,
  Spade
}

export enum Rank {
  Two = 2,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Jack,
  Queen,
  King,
  Ace
}

export class ShowdownCard extends Card {
  constructor(public suit: Suit, public rank: Rank) {
    super();
  }
  
  compare(card: ShowdownCard): number {
    if (this.rank === card.rank) {
      return this.suit - card.suit;
    }
    return this.rank - card.rank;
  }
}

export class ShowdownPlayer extends Player<ShowdownCard> {
  score:number = 0;
  playCard(): ShowdownCard {
    if (this.hand.length === 0) {
      throw new Error("No more cards left in hand");
    }
    return this.hand.pop()!;
  }

  takeTurn(): ShowdownCard {
    return this.playCard();
  }
}

export class ShowdownGame extends Game<ShowdownCard> {
  players: ShowdownPlayer[] = [];
  constructor() {
    super([
      // Initialize deck with all cards
    ]);
    this.players.push(new ShowdownPlayer('Alice'));
    this.players.push(new ShowdownPlayer('Bob'));
    this.players.push(new ShowdownPlayer('Charlie'));
    this.players.push(new ShowdownPlayer('Dave'));
  }

  startGame() {
    for (let i = 0; i < 13; i++) {
      this.players.forEach(player => player.draw(this.deck, this));
    }
    this.playGame();
  }

  reshuffleDeck() {
    this.deck.shuffle();
  }

  round() {
    let winner: ShowdownPlayer | null = null;
    let highestCard: ShowdownCard | null = null;
    for (const player of this.players) {
      const card = player.playCard();
      console.log(`${player.name} 拿出了 ${Rank[card.rank]} of ${Suit[card.suit]}`);
      if (highestCard === null || card.compare(highestCard) > 0) {
        winner = player;
        highestCard = card;
      }
    }
    if (winner) {
      winner.score++;
      console.log(`${winner.name} 贏得了這回合，目前分數為 ${winner.score}`);
    }
  }

  checkWinner(): ShowdownPlayer | null {
    let winner = this.players[0];
    for (const player of this.players.slice(1)) {
      if (player.score > winner.score) {
        winner = player;
      }
    }
    return winner;
  }

  playGame() {
    while (this.players.some(player => player.hand.length > 0)) {
      this.round();
    }
    const winner = this.checkWinner();
    if (winner) {
      console.log(`${winner.name} 贏得了比賽，最終分數為 ${winner.score}`);
    }
  }
}
