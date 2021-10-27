//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ChessWager is Ownable{
  mapping(string => Bet) private betIdToBetData;
  struct Bet {
    uint256 amount;
    string betSide; //which side user1 bets on
    string user1Id;
    address payable user1Metamask;
    string user2Id;
    address payable user2Metamask;
    uint256 multiplier; // need to div by 100
    string gameId;
  }
  mapping(string => Game) private gameIdToGameData;
  struct Game {
    string[] betIdArray;
    uint256 endTime;
  }
  mapping(address => uint256) private addressToBalance;
  mapping(string => uint256) private betIdToPrizePool;

  // constructor() {
  //   // set owner

  // }

  function placeBet(Bet calldata _bet, string calldata _betId) public payable {
    //@todo check if memory or call data is best
    require(_bet.amount == msg.value); // if user is user2, then _bet.amount should == msg.value * multiplier / 100, else if the user is user1, then simply bet amount
    require(
      msg.sender == _bet.user1Metamask || msg.sender == _bet.user2Metamask
    );

    // bool isUser1 = msg.sender == _bet.user1Metamask;

    if (betIdToBetData[_betId].multiplier == 0) {
      // bet is new
      emit TestEvent("new bet created"); // make this update ui in react

      betIdToPrizePool[_betId] += _bet.amount; // make new entry for bet

      gameIdToGameData[_bet.gameId].betIdArray.push(_betId);
      betIdToBetData[_betId] = _bet;
    } else {
      // bet is being matched
      require(betIdToBetData[_betId].amount == _bet.amount);
      require(
        keccak256(abi.encodePacked(betIdToBetData[_betId].betSide)) ==
          keccak256(abi.encodePacked(_bet.betSide))
      );
      require(
        keccak256(abi.encodePacked(betIdToBetData[_betId].user1Id)) ==
          keccak256(abi.encodePacked(_bet.user1Id))
      );
      require(betIdToBetData[_betId].user1Metamask == _bet.user1Metamask);
      require(
        keccak256(abi.encodePacked(betIdToBetData[_betId].user2Id)) ==
          keccak256(abi.encodePacked(_bet.user2Id))
      );
      require(betIdToBetData[_betId].user2Metamask == _bet.user2Metamask);
      require(betIdToBetData[_betId].multiplier == _bet.multiplier);
      require(
        keccak256(abi.encodePacked(betIdToBetData[_betId].gameId)) ==
          keccak256(abi.encodePacked(_bet.gameId))
      );

      emit TestEvent("bet matched, paying user 1");
      betIdToPrizePool[_betId] += _bet.amount;

      // _bet.user1Metamask.transfer(betIdToPrizePool[_betId]);
    }
  }

  function newBet() private {}

  function matchedBet() private {}

  function payWinners(string calldata _gameId, string calldata winningSide)
    external
    payable
    onlyOwner
  {
    // require owner to call this
    // go over game.betIdArray, and pay winner from each game
    for (uint256 i = 0; i < gameIdToGameData[_gameId].betIdArray.length; i++) {
      if ( // if bet is on winning side
        keccak256(
          abi.encodePacked(
            betIdToBetData[gameIdToGameData[_gameId].betIdArray[i]].betSide
          )
        ) == keccak256(abi.encodePacked(winningSide))
      ) {
        // pay user 1
        betIdToBetData[gameIdToGameData[_gameId].betIdArray[i]]
          .user1Metamask
          .transfer(betIdToPrizePool[gameIdToGameData[_gameId].betIdArray[i]]);
      } else {
        // pay user 2
        betIdToBetData[gameIdToGameData[_gameId].betIdArray[i]]
          .user2Metamask
          .transfer(betIdToPrizePool[gameIdToGameData[_gameId].betIdArray[i]]);
      }
    }
  }

  function withdraw(address payable userAddress) external {
    // might only keep for contingicy situations
    require(userAddress == msg.sender);
    userAddress.transfer(addressToBalance[userAddress]);
  }

  function viewBalance(address userAddress) external view returns (uint256) {
    require(userAddress == msg.sender);
    return addressToBalance[userAddress];
  }

  event TestEvent(string message);
}
