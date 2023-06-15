// Card class
export abstract class Card {
  // 你可以在這裡定義每個牌都需要的共同特性或方法
}

// Deck class
export class Deck<T extends Card> {
  public cards: T[];

  constructor(cards: T[]) {
    this.cards = cards;
  }

  // 洗牌
  shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  // 抽牌
  draw(): T | null {
    // 如果牌堆還有牌，則從牌堆頂部抽一張牌
    if (this.cards.length > 0) {
      return this.cards.pop() as T;
    } else {
      // 如果牌堆已經沒牌，則返回 null
      return null;
    }
  }

  // 獲取牌堆剩餘牌的數量
  count(): number {
    return this.cards.length;
  }

  // 重新補充牌堆
  refill(cards: T[]): void {
    this.cards = cards;
  }
}


export abstract class Player<T extends Card> {
  name: string;
  hand: T[] = [];

  constructor(name: string) {
    this.name = name;
  }

  draw(deck: Deck<T>, game: Game<T>) {
    // draw a card from the deck
  }

  abstract playCard(cardIndex: number): T 

  // each type of player will implement its own takeTurn function
  abstract takeTurn(topCard: T): number | null;
}

// Game class
export abstract class Game<T extends Card> {
  deck: Deck<T>;
  players: Player<T>[];

  constructor(cards: T[]) {
    this.deck = new Deck<T>(cards);
    this.players = [];
  }

  // each type of game will implement its own startGame, reshuffleDeck, round, checkWinner, and playGame functions
  abstract startGame(): void;
  abstract reshuffleDeck(): void;
  abstract round(): void;
  abstract checkWinner(): Player<T> | null;
  abstract playGame(): void;
}
