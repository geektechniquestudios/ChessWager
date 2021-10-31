//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ChessWager is Ownable {
  mapping(string => Bet) private betIdToBetData;
  mapping(string => uint256) private betIdToPrizePool;
  mapping(string => bool) private betIdToIsBetMatched;
  mapping(string => bool) private betIdToIsBetCompleted;
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
  mapping(address => uint256) private addressToBalance; // @todo remove if not using
  // mapping for who bet first
  mapping(string => string) private betIdtoWhoBetFirst; // enum {user1, user2}
  uint256 private chessWagerFunds;
  address  private chessWagerAddress;

  constructor() {
    // store chesswageraddress
    chessWagerAddress = msg.sender;
    chessWagerFunds = 0;

  }

  function placeBet(Bet calldata _bet, string calldata _betId) public payable {
    require(_bet.amount == msg.value); // if user is user2, then _bet.amount should == msg.value * multiplier / 100, else if the user is user1, then simply bet amount
    require(
      msg.sender == _bet.user1Metamask || msg.sender == _bet.user2Metamask
    );
    require(betIdToIsBetCompleted[_betId] == false);

    // bool isUser1 = msg.sender == _bet.user1Metamask;

    if (betIdToBetData[_betId].multiplier == 0) {
      // bet is new
      betIdToIsBetMatched[_betId] = false;

      // make whoBetFirst mapping
      if (msg.sender == _bet.user1Metamask) {
        betIdtoWhoBetFirst[_betId] = "user1";
      } else {
        betIdtoWhoBetFirst[_betId] = "user2";
      }

      emit TestEvent("new bet created"); // make this update ui in react

      betIdToPrizePool[_betId] += _bet.amount; // make new entry for bet

      gameIdToGameData[_bet.gameId].betIdArray.push(_betId);
      betIdToBetData[_betId] = _bet;
    } else {
      // bet is matched
      betIdToIsBetMatched[_betId] = true;
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
    emit TestEvent("payWinners called");
    // go over game.betIdArray, and pay winner from each game
    for (uint256 i = 0; i < gameIdToGameData[_gameId].betIdArray.length; i++) {
      Bet memory bet = betIdToBetData[gameIdToGameData[_gameId].betIdArray[i]];
      uint256 prizePool = betIdToPrizePool[
        gameIdToGameData[_gameId].betIdArray[i]
      ];
      betIdToIsBetCompleted[gameIdToGameData[_gameId].betIdArray[i]] = true;
      if (
        betIdToIsBetMatched[gameIdToGameData[_gameId].betIdArray[i]] == false
      ) {
        // bet is not matched
        // return money to user that bet first
        if (
          keccak256(
            abi.encodePacked(
              betIdtoWhoBetFirst[gameIdToGameData[_gameId].betIdArray[i]]
            )
          ) == keccak256(abi.encodePacked("user1"))
        ) {
          bet.user1Metamask.transfer(prizePool);
        } else {
          // user2 was the only one that paid
          bet.user2Metamask.transfer(prizePool);
        }
        continue;
      }

      // if game is a draw, then return money to both users //@todo current
      if (
        keccak256(abi.encodePacked(winningSide)) ==
        keccak256(abi.encodePacked("draw"))
      ) {
        uint256 user1BetAmount = (prizePool / (1 + (bet.multiplier / 100)));
        bet.user1Metamask.transfer(
          user1BetAmount // minus comission
        );
        bet.user2Metamask.transfer(
          prizePool - user1BetAmount // minus comission
        );
        continue;
      }

      if (
        // if bet is on winning side
        keccak256(abi.encodePacked(bet.betSide)) ==
        keccak256(abi.encodePacked(winningSide))
      ) {
        // pay user 1
        bet.user1Metamask.transfer(prizePool);
      } else {
        // pay user 2
        bet.user2Metamask.transfer(prizePool);
      }
    }
    emit TestEvent("payWinners finished");
  }

  function returnMoneyToUnassociatedBets() external onlyOwner {
    // if bet is older than one hour, then return money to user
  }

  function withdraw(address payable userAddress) external payable {

    userAddress.transfer(addressToBalance[userAddress]); // @todo this is not working, no balances stored
  }

  function withdrawChessWagerBalance(address payable userAddress) external payable {

    userAddress.transfer(addressToBalance[userAddress]); // @todo this is not working, no balances stored
  }

  function viewBalance(address userAddress) external view returns (uint256) {
    require(userAddress == msg.sender);
    return addressToBalance[userAddress]; //@todo emit instead
  }

  function viewChessWagerBalance() external view returns (uint256) {
    return chessWagerFunds;
  }

  event TestEvent(string message);
}
