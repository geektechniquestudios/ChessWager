//SPDX-License-Identifier: Affero-3.0
pragma solidity ^0.8.11;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract ChessWager is Ownable, Pausable {
  mapping(string => bool) private gameIdToIsGameOver;
  mapping(string => Bet) private betIdToBetData;
  mapping(string => uint256) private betIdToPrizePool;
  mapping(string => bool) private betIdToIsBetMatched;
  mapping(string => bool) private betIdToIsBetCompleted;
  mapping(string => string) private betIdToWhoBetFirst; // enum {user1, user2}
  mapping(address => bool) private bannedUsers;
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
  uint256 private chessWagerBalance;
  address payable private chessWagerAddress;
  uint256 public totalWagered; // overall amount spent on contract

  constructor() {
    chessWagerAddress = payable(msg.sender);
    chessWagerBalance = 0;
  }

  function pause() external onlyOwner {
    _pause();
  }

  function unpause() external onlyOwner {
    _unpause();
  }

  function banUserByWalletAddress(address _user) external onlyOwner {
    bannedUsers[_user] = true;
  }

  function banMultipleUsersByWalletAddress(
    address[] calldata _users
  ) external onlyOwner {
    for (uint256 i = 0; i < _users.length; i++) {
      bannedUsers[_users[i]] = true;
    }
  }

  function unbanUserByWalletAddress(address _user) external onlyOwner {
    bannedUsers[_user] = false;
  }

  function placeBet(
    Bet calldata _bet,
    string calldata _betId
  ) external payable whenNotPaused {
    require(msg.value > 0, "Amount must be more than 0");
    require(
      betIdToIsBetMatched[_betId] != true,
      "Only 2 users can particiapte in a bet"
    );
    require(
      keccak256(abi.encodePacked(_bet.user1Id)) !=
        keccak256(abi.encodePacked(_bet.user2Id)),
      "User 1 and User 2 can't be the same user"
    );
    // 10,000 because you need to divide by 100 to get the actual multiplier
    require(_bet.multiplier <= 10000, "Multiplier can't be more than 100");
    require(_bet.multiplier > 0, "Multiplier must be greater than 0");
    require(gameIdToIsGameOver[_bet.gameId] != true, "Game is already over");
    require(
      msg.sender == _bet.user1Metamask || msg.sender == _bet.user2Metamask,
      "The user's wallet address doesn't equal the address in the bet"
    );
    require(betIdToIsBetCompleted[_betId] == false, "Bet is already complete");
    require(
      keccak256(abi.encodePacked(_bet.betSide)) ==
        keccak256(abi.encodePacked("white")) ||
        keccak256(abi.encodePacked(_bet.betSide)) ==
        keccak256(abi.encodePacked("black")),
      "Bet side must only be 'white' or 'black'"
    );

    if (betIdToBetData[_betId].multiplier == 0) {
      // bet is new
      require(
        bytes(betIdToWhoBetFirst[_betId]).length == 0,
        "Bet already initialized"
      );
      betIdToIsBetMatched[_betId] = false;
      require(
        !bannedUsers[_bet.user1Metamask] && !bannedUsers[_bet.user2Metamask],
        "At least one user in this wager is banned"
      );

      // make whoBetFirst mapping
      if (msg.sender == _bet.user1Metamask) {
        // user1
        require(msg.value == _bet.amount, "Wrong amount sent");
        betIdToWhoBetFirst[_betId] = "user1";
        emit BetPlacedStatus("user1 has paid", _betId, _bet.gameId);
      } else {
        // user2
        require(
          ((_bet.amount * _bet.multiplier) / 100) == msg.value,
          "Wrong amount sent"
        );
        betIdToWhoBetFirst[_betId] = "user2";
        emit BetPlacedStatus("user2 has paid", _betId, _bet.gameId);
      }

      betIdToPrizePool[_betId] = msg.value;

      gameIdToGameData[_bet.gameId].betIdArray.push(_betId); // this is iterated over when payout occurs
      betIdToBetData[_betId] = _bet;
    } else {
      // second user has placed bet
      require(
        bytes(betIdToWhoBetFirst[_betId]).length > 0,
        "Bet not initialized"
      );
      // requirements to check for matching values between user1 and user2
      require(
        betIdToBetData[_betId].amount == _bet.amount,
        "User 1 bet.amount doesn't match user 2 bet.amount"
      );
      require(
        keccak256(abi.encodePacked(betIdToBetData[_betId].betSide)) ==
          keccak256(abi.encodePacked(_bet.betSide)),
        "User 1 bet.betSide doesn't match user 2 bet.betSide"
      );
      require(
        keccak256(abi.encodePacked(betIdToBetData[_betId].user1Id)) ==
          keccak256(abi.encodePacked(_bet.user1Id)),
        "User 1 bet.user1Id doesn't match user 2 bet.user1Id"
      );
      require(
        betIdToBetData[_betId].user1Metamask == _bet.user1Metamask,
        "User 1 bet.user1Metamask doesn't match user 2 bet.user1Metamask"
      );
      require(
        keccak256(abi.encodePacked(betIdToBetData[_betId].user2Id)) ==
          keccak256(abi.encodePacked(_bet.user2Id)),
        "User 1 bet.user2Id doesn't match user 2 bet.user2Id"
      );
      require(
        betIdToBetData[_betId].user2Metamask == _bet.user2Metamask,
        "User 1 bet.user2Metamask doesn't match user 2 bet.user2Metamask"
      );
      require(
        betIdToBetData[_betId].multiplier == _bet.multiplier,
        "User 1 bet.multiplier doesn't match user 2 bet.multiplier"
      );
      require(
        keccak256(abi.encodePacked(betIdToBetData[_betId].gameId)) ==
          keccak256(abi.encodePacked(_bet.gameId)),
        "User 1 bet.gameId doesn't match user 2 bet.gameId"
      );
      require(
        betIdToBetData[_betId].timestamp == _bet.timestamp,
        "User 1 bet.timestamp doesn't match user 2 bet.timestamp"
      );

      // check bet amount, update prize pool based on user
      if (
        keccak256(abi.encodePacked(betIdToWhoBetFirst[_betId])) ==
        keccak256(abi.encodePacked("user2"))
      ) {
        // user2 bet first, so this statement is true if user1 paid during this method call
        require(
          msg.sender == _bet.user1Metamask,
          "User 1 wallet address doesn't match sender address"
        );
        require(msg.value == _bet.amount, "Wrong amount sent");
        betIdToPrizePool[_betId] += msg.value;
        emit BetPlacedStatus("user1 has paid", _betId, _bet.gameId);
      } else {
        // this runs if user2 paid this method call
        require(
          msg.sender == _bet.user2Metamask,
          "User 2 wallet address doesn't match sender address"
        );
        require(
          ((_bet.amount * _bet.multiplier) / 100) == msg.value,
          "Wrong amount sent"
        );
        betIdToPrizePool[_betId] += msg.value;
        emit BetPlacedStatus("user2 has paid", _betId, _bet.gameId);
      }
      // bet is matched, both users have paid
      betIdToIsBetMatched[_betId] = true;
    }

    totalWagered += msg.value;
  }

  // winning side can be "white", "black", or "draw"
  function payWinners(
    string calldata _gameId,
    string calldata winningSide
  ) external payable onlyOwner {
    require(gameIdToIsGameOver[_gameId] != true, "Game is already paid");

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
            false,
            "none"
          );
        } else {
          // user2 was the only one that paid
          bet.user2Metamask.transfer(prizePool);

          emit PayoutStatus(
            gameIdToGameData[_gameId].betIdArray[i],
            _gameId,
            false,
            true,
            "none"
          );
        }
        continue;
      }

      // bet is matched
      emit PayoutStatus(
        gameIdToGameData[_gameId].betIdArray[i],
        _gameId,
        true,
        true,
        winningSide
      );

      // if game is a draw, then return money to both users
      if (
        keccak256(abi.encodePacked(winningSide)) ==
        keccak256(abi.encodePacked("draw"))
      ) {
        uint256 user1BetAmount = bet.amount;
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

  function withdrawChessWagerBalance() external payable onlyOwner {
    chessWagerAddress.transfer(chessWagerBalance);
    chessWagerBalance = 0;
  }

  function viewChessWagerBalance() external view onlyOwner returns (uint256) {
    return chessWagerBalance;
  }

  event BetPlacedStatus(string message, string betId, string gameId);
  event PayoutStatus(
    string betId,
    string gameId,
    bool didUser1Pay,
    bool didUser2Pay,
    string winningSide
  );
}
