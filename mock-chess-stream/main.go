package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sync"
	"time"
)

const (
	Reset = "\033[0m"
	Bold  = "\033[1m"
	Red   = "\033[31m"
	Green = "\033[32m"
	Cyan  = "\033[36m"
	White = "\033[97m"
)

var currentGameID = "defaultGameID"
var previousGameID = ""
var moveCounter = 0
var lock sync.Mutex

var startNewGame func()

func main() {
	http.HandleFunc("/api/tv/feed", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/x-ndjson")
		flusher, _ := w.(http.Flusher)

		newGameCh := make(chan bool)
		chessData := GetChessData(newGameCh)
	
		// Call this function whenever a new game starts.
		startNewGame = func() {
			newGameCh <- true
		}

		// Ensure first response is always "featured".
		startNewGame()

		for game := range chessData {
			j, err := json.Marshal(game)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			fmt.Fprintf(w, "%s\n", j)
			flusher.Flush()
		}
	})	

	http.HandleFunc("/api/game/start", func(w http.ResponseWriter, r *http.Request) {
		lock.Lock()
		defer lock.Unlock()

		currentGameID = fmt.Sprintf("game%d", time.Now().Unix())
		startNewGame() // signal to start a new game

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{
			"gameID": currentGameID,
		})
	})	

	// White always wins
	http.HandleFunc("/api/game/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		log.Printf("Responding to %s/api/game%s request\n", Cyan, Reset)
		result := GetGameResult()

		jsonData, err := json.Marshal(result)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		_, err = w.Write(jsonData)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	})

	port := ":8080"
	fmt.Printf("\n%s%sMock Lichess server listening on localhost%s%s\n\n", Bold, Green, Reset, Reset)
	fmt.Printf("  %s➜  %sLocal:   %shttp://localhost%s/%s\n", Green, White, Cyan, port, Reset)
	fmt.Printf("  %s➜  %sEndpoint: %s/api/tv/feed%s\n", Green, White, Cyan, Reset)
	fmt.Printf("  %s➜  %sEndpoint: %s/api/game/%s\n\n", Green, White, Cyan, Reset)

	err := http.ListenAndServe(port, nil)
	if err != nil {
		fmt.Printf("%sServer failed to start: %v%s\n", Red, err, Reset)
	}
}
