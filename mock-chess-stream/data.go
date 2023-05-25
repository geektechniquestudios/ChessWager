package main

import (
	"time"
)

func GetChessData(newGameCh <-chan bool) <-chan ChessGame {
	chessData := make(chan ChessGame)

	go func() {
		defer close(chessData)

		// Define a default game state here. Update this as necessary.
		gameState := map[string]interface{}{
			"fen":  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
			"lm":   "",
			"wc":   0,
			"bc":   0,
		}

		for {
			select {
			case <-newGameCh:
				// Generate a "featured" game when a new game starts.
				featuredGame := ChessGame{
					T: "featured",
					D: map[string]interface{}{
						"id":          currentGameID,
						"orientation": "white",
						"players": []map[string]interface{}{
							{
								"color":   "white",
								"user":    map[string]string{"name": "estocastico", "title": "IM", "id": "estocastico"},
								"rating":  2753,
								"seconds": 153,
							},
							{
								"color":   "black",
								"user":    map[string]string{"name": "vvchessli", "title": "IM", "id": "vvchessli"},
								"rating":  2703,
								"seconds": 153,
							},
						},
						"fen": gameState["fen"].(string),
					},
				}
				chessData <- featuredGame
			default:
				// Generate a "fen" move otherwise.

				// Update gameState here based on the actual game progress.

				fenGame := ChessGame{
					T: "fen",
					D: map[string]interface{}{
						"fen": gameState["fen"].(string),
						"lm":  gameState["lm"].(string),
						"wc":  gameState["wc"].(int),
						"bc":  gameState["bc"].(int),
					},
				}
				chessData <- fenGame
			}

			time.Sleep(3 * time.Second)
		}
	}()

	return chessData
}

func GetGameResult() GameResult {
	return GameResult{
		Winner: "white",
		Status: "mate",
		Players: map[string]Player{
			"white": {
				Name:    "estocastico",
				Title:   "IM",
				Id:      "estocastico",
				Rating:  2753,
				Seconds: 153,
			},
			"black": {
				Name:    "vvchessli",
				Title:   "IM",
				Id:      "vvchessli",
				Rating:  2703,
				Seconds: 153,
			},
		},
	}
}
