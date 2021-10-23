//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract ChessWager {
  struct Bet {
    uint amount;
    string betSide; //which side user1 bets on
    string user1Id;
    address payable user1Metamask;
    string user2Id;
    address payable user2Metamask;
    uint multiplier; // need to div by 100
    string gameId;
  }
  mapping(string => Bet) private betIdToBetData;
  mapping(address => uint) private addressToBalance;
  mapping(string => uint) private betIdToPrizePool;

  // constructor() { 
  //   // set owner

  // }

  function placeBet(Bet calldata _bet, string  calldata _betId ) payable public { //@todo check if memory or call data is best
    require(_bet.amount == msg.value); // if user is user2, then _bet.amount should == msg.value * multiplier / 100, else if the user is user1, then simply bet amount
    require(msg.sender == _bet.user1Metamask || msg.sender == _bet.user2Metamask); 

    // bool isUser1 = msg.sender == _bet.user1Metamask;

    if (betIdToBetData[_betId].multiplier == 0) {// bet is new
      emit TestEvent("new bet created"); // make this update ui in react
      betIdToPrizePool[_betId] += _bet.amount; // make new entry for bet
      // add bet to betid to betdata
      betIdToBetData[_betId] = _bet;


    } else { // bet is being matched
      //set var saying both parties bet
      require(betIdToBetData[_betId].amount == _bet.amount);
      require(keccak256(abi.encodePacked(betIdToBetData[_betId].betSide)) == keccak256(abi.encodePacked(_bet.betSide)));
      require(keccak256(abi.encodePacked(betIdToBetData[_betId].user1Id)) == keccak256(abi.encodePacked(_bet.user1Id)));
      require(betIdToBetData[_betId].user1Metamask == _bet.user1Metamask);
      require(keccak256(abi.encodePacked(betIdToBetData[_betId].user2Id)) == keccak256(abi.encodePacked(_bet.user2Id)));
      require(betIdToBetData[_betId].user2Metamask == _bet.user2Metamask);
      require(betIdToBetData[_betId].multiplier == _bet.multiplier);
      require(keccak256(abi.encodePacked(betIdToBetData[_betId].gameId)) == keccak256(abi.encodePacked(_bet.gameId)));
      
      emit TestEvent("bet matched, paying user 1");
      betIdToPrizePool[_betId] += _bet.amount;
      //pay user 1, temp
      _bet.user1Metamask.transfer(betIdToPrizePool[_betId]);
    }
  }

  function newBet() private {}

  function matchedBet() private {}

  function withdraw(address payable userAddress) external {
    require(userAddress == msg.sender);
    userAddress.transfer(addressToBalance[userAddress]);

  }

  function viewBalance(address userAddress) external view returns (uint) {
    require(userAddress == msg.sender);
    return addressToBalance[userAddress];
  }

  event TestEvent(string message);
}
