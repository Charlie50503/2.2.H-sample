// // 玩家基類
// abstract class ShowdownPlayer<T extends Card> {
//   name: string;
//   hand: T[] = [];
//   score: number = 0;

//   constructor(name: string) {
//     this.name = name;
//   }

//   abstract showdown(table: T[]): T | null;
//   // 其他方法略
// }

// // 真實玩家
// class HumanPlayer extends ShowdownPlayer<UNOCard> {
//   showdown(table: UNOCard[]): UNOCard | null {
//     // 假設輸入的指令是數字，代表手牌中的第幾張牌
//     const input = Number(prompt('選擇一張要出的牌（輸入數字）:'));
//     const selectedCard = this.hand[input];

//     // 檢查選擇的牌是否符合出牌規則
//     if (selectedCard.color === table[table.length - 1].color || selectedCard.number === table[table.length - 1].number) {
//       this.hand.splice(input, 1); // 移除手牌
//       return selectedCard;
//     } else {
//       console.log('選擇的牌不符合出牌規則');
//       return null;
//     }
//   }

//   // 其他方法略
// }

// // AI玩家
// class AIPlayer extends ShowdownPlayer<UNOCard> {
//   showdown(table: UNOCard[]): UNOCard | null {
//     for (let i = 0; i < this.hand.length; i++) {
//       let selectedCard = this.hand[i];

//       // 檢查選擇的牌是否符合出牌規則
//       if (selectedCard.color === table[table.length - 1].color || selectedCard.number === table[table.length - 1].number) {
//         this.hand.splice(i, 1); // 移除手牌
//         return selectedCard;
//       }
//     }

//     // 如果沒有符合規則的牌，則不出牌
//     console.log(`${this.name} 沒有符合規則的牌`);
//     return null;
//   }

//   // 其他方法略
// }
