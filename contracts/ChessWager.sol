//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract ChessWager {
  string private greeting;

  constructor() {
    console.log("Deploying a one of a kind contract with a message on it: ");
    greeting = "test val";
  }

  function greet() public view returns (string memory) {
    return greeting;
  }

  function setGreeting(string memory _greeting) public {
    console.log("Changing message from '%s' to '%s'", greeting, _greeting);
    greeting = _greeting;
  }

  ///////

  mapping(string => Bet) private betIdToBetData;
  struct Bet {
    uint amount;
    string betSide; //which side user1 bets on
    string user1Id;
    address payable user1Metamask;
    string user2Id;
    address payable user2Metamask;
    uint multiplier; // need to div by 100
  }

  mapping(address => uint) private addressToBalance;

  // constructor() { 
  //   // set owner

  // }

  function placeBet(Bet calldata _bet, string  memory _betId ) payable public { //@todo check if memory or call data is best
    // require(_bet.amount == msg.value);
    // if (betIdToBetData[_betId].amount == 0) {// bet is new
    //   require(msg.sender == _bet.user1Metamask); 
    //     console.log("new bet created with id: ", _betId);
    //     betIdToBetData[_betId] = _bet;
    // } else {
    //   require(msg.sender == _bet.user2Metamask);
    //     console.log("bet called with id: ", _betId);
    // }
  }

  event TestEvent(string message);
  function testMethod(string memory _greeting) public {
    greeting = _greeting;
    emit TestEvent("A message from the test event");
  }
}
