//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/EnumerableMap.sol";
import "@openzeppelin/contracts/utils/Pausable.sol"; // @todo

contract ChessWager {

  ///////

  // string private betId;
  mapping(string => Bet) private betIdToBetData;
  struct Bet {
    string createdAt;
    string amount;
    string betSide; //which side user1 bets on
    string user1Id;
    address user1Metamask;
    string user2Id;
    address user2Metamask;
    bool isBetNew;
  }

  constructor() { 
    // set owner

  }

  function placeBet(Bet _bet, int _betId ) payable public returns (bool) {
    if () {// bet is new
      require(msg.sender == _bet.user1Metamask)

    }
  }
}
