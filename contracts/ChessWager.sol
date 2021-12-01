//SPDX-License-Identifier: Affero-3.0
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ChessWager is Ownable {
  mapping(string => bool) private gameIdToIsGameOver;
  mapping(string => Bet) private betIdToBetData;
  mapping(string => uint256) private betIdToPrizePool;
  mapping(string => bool) private betIdToIsBetMatched;
  mapping(string => bool) private betIdToIsBetCompleted;
  mapping(string => string) private betIdToWhoBetFirst; // enum {user1, user2}
  struct Bet {
    uint256 amount;
    string betSide; // which side user1 bets on
    string user1Id;
    address payable user1Metamask;
    string user2Id;
    address payable user2Metamask;
    uint256 multiplier; // need to div by 100
    string gameId;
    uint256 timestamp;
  }
  mapping(string => Game) private gameIdToGameData;
  struct Game {
    string[] betIdArray;
    uint256 endTime;
  }
  mapping(address => uint256) private addressToBalance; // @todo remove if not using
  // mapping for who bet first
  uint256 private chessWagerBalance;
  address payable private chessWagerAddress;
  uint256 public totalWagered;

  constructor() {
    // store chesswageraddress
    chessWagerAddress = payable(msg.sender);
    chessWagerBalance = 0;
  }

  function placeBet(Bet calldata _bet, string calldata _betId) public payable {
    // ensure no more than 20 seconds has passed since the bet timestamp
    require(block.timestamp - _bet.timestamp < 20000);
    require(gameIdToIsGameOver[_bet.gameId] != true);
    require(
      msg.sender == _bet.user1Metamask || msg.sender == _bet.user2Metamask
    );
    require(betIdToIsBetCompleted[_betId] == false);
    require(
      keccak256(abi.encodePacked(_bet.betSide)) ==
        keccak256(abi.encodePacked("white")) ||
        keccak256(abi.encodePacked(_bet.betSide)) ==
        keccak256(abi.encodePacked("black"))
    );

    totalWagered += msg.value;

    if (betIdToBetData[_betId].multiplier == 0) {
      // bet is new
      betIdToIsBetMatched[_betId] = false;

      // make whoBetFirst mapping
      if (msg.sender == _bet.user1Metamask) {
        // user1
        require(msg.value == _bet.amount);
        betIdToWhoBetFirst[_betId] = "user1";
        emit BetPlacedStatus("user1 has paid", _betId);
      } else {
        // user2
        require(msg.value == (_bet.amount * _bet.multiplier) / 100);
        betIdToWhoBetFirst[_betId] = "user2";
        emit BetPlacedStatus("user2 has paid", _betId);
      }

      betIdToPrizePool[_betId] = msg.value;

      gameIdToGameData[_bet.gameId].betIdArray.push(_betId); // this is iterated over when payout occurs
      betIdToBetData[_betId] = _bet;
    } else {
      // requirements to check for matching values between user1 and user2
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
      // check bet amount, update prize pool based on user
      if (
        keccak256(abi.encodePacked(betIdToWhoBetFirst[_betId])) ==
        keccak256(abi.encodePacked("user2"))
      ) {
        // user2 bet first, so this statement is true if user1 paid during this method call
        require(msg.sender == _bet.user1Metamask);
        require(msg.value == _bet.amount);
        betIdToPrizePool[_betId] += msg.value;
        emit BetPlacedStatus("user1 has paid", _betId);
      } else {
        // this runs if user2 paid this method call
        require(msg.sender == _bet.user2Metamask);
        require(msg.value == (_bet.amount * _bet.multiplier) / 100);
        betIdToPrizePool[_betId] += msg.value;
        emit BetPlacedStatus("user2 has paid", _betId);
      }
      // bet is matched, second person pays
      betIdToIsBetMatched[_betId] = true;
    }
  }

  function newBet() private {}

  function matchedBet() private {}

  function payWinners(string calldata _gameId, string calldata winningSide)
    external
    payable
    onlyOwner
  {
    gameIdToIsGameOver[_gameId] = true; // prevents new bets on old games
    for (uint256 i = 0; i < gameIdToGameData[_gameId].betIdArray.length; i++) {
      // going over each bet for this gameId
      Bet memory bet = betIdToBetData[gameIdToGameData[_gameId].betIdArray[i]];

      uint256 prizePool = betIdToPrizePool[
        gameIdToGameData[_gameId].betIdArray[i]
      ];
      betIdToIsBetCompleted[gameIdToGameData[_gameId].betIdArray[i]] = true;
      if (
        // bet is not matched
        betIdToIsBetMatched[gameIdToGameData[_gameId].betIdArray[i]] == false
      ) {
        // return money to user that bet first
        if (
          // user1 was the only one that paid
          keccak256(
            abi.encodePacked(
              betIdToWhoBetFirst[gameIdToGameData[_gameId].betIdArray[i]]
            )
          ) == keccak256(abi.encodePacked("user1"))
        ) {
          bet.user1Metamask.transfer(prizePool);
          emit PayoutStatus(
            gameIdToGameData[_gameId].betIdArray[i],
            _gameId,
            true,
            false
          );
        } else {
          // user2 was the only one that paid
          bet.user2Metamask.transfer((prizePool * bet.multiplier) / 100);

          emit PayoutStatus(
            gameIdToGameData[_gameId].betIdArray[i],
            _gameId,
            false,
            true
          );
        }
        continue;
      }

      // bet is matched
      emit PayoutStatus(
        gameIdToGameData[_gameId].betIdArray[i],
        _gameId,
        true,
        true
      );

      // if game is a draw, then return money to both users
      if (
        keccak256(abi.encodePacked(winningSide)) ==
        keccak256(abi.encodePacked("draw"))
      ) {
        uint256 user1BetAmount = (prizePool / (1 + (bet.multiplier / 100)));
        bet.user1Metamask.transfer(user1BetAmount);
        bet.user2Metamask.transfer(prizePool - user1BetAmount);
        continue;
      }

      // all checks done, only remaining outcome is one side winning
      // subtract 4.5% vig from prize pool
      uint256 vig = ((prizePool * 9) / 2) / 100;
      chessWagerBalance += vig;
      prizePool -= vig;

      if (
        // if bet is on winning side
        keccak256(abi.encodePacked(bet.betSide)) ==
        keccak256(abi.encodePacked(winningSide))
      ) {
        bet.user1Metamask.transfer(prizePool);
      } else {
        bet.user2Metamask.transfer(prizePool);
      }
    }
  }

  function payToSpecificBet(
    string calldata _betId,
    string calldata _winningSide
  ) external payable onlyOwner {
    Bet memory bet = betIdToBetData[_betId];
    uint256 prizePool = betIdToPrizePool[_betId];

    if (
      // bet is not matched
      betIdToIsBetMatched[_betId] == false
    ) {
      // return money to user that bet first
      if (
        // user1 was the only one that paid
        keccak256(abi.encodePacked(betIdToWhoBetFirst[_betId])) ==
        keccak256(abi.encodePacked("user1"))
      ) {
        bet.user1Metamask.transfer(prizePool);
      } else {
        // user2 was the only one that paid
        bet.user2Metamask.transfer((prizePool * bet.multiplier) / 100);
      }
    }

    // if game is a draw, then return money to both users
    if (
      keccak256(abi.encodePacked(_winningSide)) ==
      keccak256(abi.encodePacked("draw"))
    ) {
      uint256 user1BetAmount = (prizePool / (1 + (bet.multiplier / 100)));
      bet.user1Metamask.transfer(
        user1BetAmount // minus comission
      );
      bet.user2Metamask.transfer(
        prizePool - user1BetAmount // minus comission
      );
    }

    // all checks done, only remaining outcome is one side winning
    // subtract 4.5% vig from prize pool
    uint256 vig = ((prizePool * 9) / 2) / 100;
    chessWagerBalance += vig;
    prizePool -= vig;

    // if bet is on winning side
    // remember user1 created the bet, so winningSide is from their perspective
    if (
      keccak256(abi.encodePacked(bet.betSide)) ==
      keccak256(abi.encodePacked(_winningSide))
    ) {
      bet.user1Metamask.transfer(prizePool);
    } else {
      bet.user2Metamask.transfer(prizePool);
    }
  }

  function withdrawChessWagerBalance() external payable onlyOwner {
    chessWagerAddress.transfer(chessWagerBalance);
    chessWagerBalance = 0;
  }

  function viewChessWagerBalance() external view onlyOwner returns (uint256) {
    return chessWagerBalance;
  }

  event BetPlacedStatus(string message, string betId);
  event PayoutStatus(
    string betId,
    string gameId,
    bool didUser1Pay,
    bool didUser2Pay
  );
}
