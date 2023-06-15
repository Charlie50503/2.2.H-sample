import { Card, Deck, Game, Player } from "./template";

// 首先我們定義 UNOCard 類別
enum UNOColor {
  BLUE,
  RED,
  YELLOW,
  GREEN
}

class UNOCard {
  color: UNOColor;
  number: number;

  constructor(color: UNOColor, number: number) {
    this.color = color;
    this.number = number;
  }

  isMatch(card: UNOCard): boolean {
    return this.color === card.color || this.number === card.number;
  }
}

// 以下為玩家類別
abstract class UnoPlayer<T extends Card> extends Player<T> {
  constructor(name: string) {
    super(name)
  }

  draw(deck: Deck<T>, game: Game<T>) {
    if (deck.cards.length === 0) {
      game.reshuffleDeck();
    }
    const card = deck.draw();
    if (card) {
      this.hand.push(card);
    }
  }

  playCard(cardIndex: number): T {
    return this.hand.splice(cardIndex, 1)[0];
  }

  abstract takeTurn(topCard: T): number | null;
}

class HumanPlayer extends UnoPlayer<UNOCard> {
  // 這裡簡單實作，實際情況可能需要接入 UI 或命令行介面等
  takeTurn(topCard: UNOCard): number | null {
    for (let i = 0; i < this.hand.length; i++) {
      if (this.hand[i].isMatch(topCard)) {
        return i;
      }
    }
    return null;
  }
}

class AIPlayer extends UnoPlayer<UNOCard> {
  // AI 的策略為：如果有可以出的牌，就出第一張可以出的牌；否則不出牌
  takeTurn(topCard: UNOCard): number | null {
    for (let i = 0; i < this.hand.length; i++) {
      if (this.hand[i].isMatch(topCard)) {
        return i;
      }
    }
    return null;
  }
}

// 以下為 UNO 遊戲類別
export class UNOGame extends Game<UNOCard> {
  topCard: UNOCard | null = null;
  table: UNOCard[] = [];

  constructor() {
    const cards: UNOCard[] = [];
    // 我們會為每種顏色和數字創建一張牌
    for (let i = 0; i < 10; i++) {
      cards.push(new UNOCard(UNOColor.BLUE, i));
      cards.push(new UNOCard(UNOColor.RED, i));
      cards.push(new UNOCard(UNOColor.YELLOW, i));
      cards.push(new UNOCard(UNOColor.GREEN, i));
    }

    super(cards);
    this.players = [new HumanPlayer('Alice'), new AIPlayer('Bob'), new AIPlayer('Charlie'), new AIPlayer('Dave')];
  }

  startGame() {
    this.deck.shuffle();
    this.players.forEach(player => player.draw(this.deck, this));

    // 翻開牌堆頂部的牌，作為開始的牌
    this.topCard = this.deck.draw()!;
    this.table.push(this.topCard);
  }

  reshuffleDeck() {
    // 從桌面上取回牌，並洗牌
    this.deck.cards.push(...this.table.slice(0, this.table.length - 1));
    this.table = this.table.slice(this.table.length - 1);
    this.deck.shuffle();
  }

  round() {
    this.players.forEach(player => {
      if (this.topCard) {
        const action = player.takeTurn(this.topCard);
        if (action !== null) {
          this.topCard = player.playCard(action);
          this.table.push(this.topCard);
        } else {
          player.draw(this.deck, this);
        }
      }
    });
  }

  checkWinner(): UnoPlayer<UNOCard> | null {
    for (const player of this.players) {
      if (player.hand.length === 0) {
        return player;
      }
    }
    return null;
  }

  playGame() {
    this.startGame();
    while (!this.checkWinner()) {
      this.round();
    }
    const winner = this.checkWinner();
    if (winner) {
      console.log(`The winner is ${winner.name}`);
    }
  }
}
