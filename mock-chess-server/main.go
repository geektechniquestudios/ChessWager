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

type PubSub struct {
	mu               sync.RWMutex
	subs             map[*chan ChessGame]bool
	lastFeaturedGame ChessGame
}

func NewPubSub() *PubSub {
	return &PubSub{
		subs: make(map[*chan ChessGame]bool),
	}
}

func (ps *PubSub) Subscribe() *chan ChessGame {
	ps.mu.Lock()
	defer ps.mu.Unlock()

	ch := make(chan ChessGame)
	ps.subs[&ch] = true

	// Send the most recent "Featured" chunk to the new subscriber
	go func() { ch <- ps.lastFeaturedGame }()

	return &ch
}

func (ps *PubSub) Unsubscribe(ch *chan ChessGame) {
	ps.mu.Lock()
	defer ps.mu.Unlock()

	delete(ps.subs, ch)
	close(*ch)
}

func (ps *PubSub) Publish(game ChessGame) {
	ps.mu.Lock()
	defer ps.mu.Unlock()

	for ch := range ps.subs {
		select {
		case *ch <- game:
		default:
		}
	}

	// Store the most recent "Featured" chunk
	if game.T == "featured" {
		ps.lastFeaturedGame = game
	}
}

var currentGameID = fmt.Sprintf("game%d", time.Now().Unix())
var lock sync.Mutex

var pubsub = NewPubSub()

func main() {
	http.HandleFunc("/api/tv/feed", func(w http.ResponseWriter, r *http.Request) {
		log.Printf("Responding to %s/api/tv/feed%s request\n", Cyan, Reset)

		// Allow CORS
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Content-Type", "application/x-ndjson")

		ch := pubsub.Subscribe()
		defer pubsub.Unsubscribe(ch)

		for game := range *ch {
			if game.T == "featured" { // Only handle 'featured' games
				j, err := json.Marshal(game)
				if err != nil {
					http.Error(w, err.Error(), http.StatusInternalServerError)
					return
				}
				fmt.Fprintf(w, "%s\n", j)
				if flusher, ok := w.(http.Flusher); ok {
					flusher.Flush()
				}
			}
		}
	})

	http.HandleFunc("/api/new-game", func(w http.ResponseWriter, r *http.Request) {
		log.Printf("Responding to %s/api/new-game%s request\n", Cyan, Reset)

		lock.Lock()
		currentGameID = fmt.Sprintf("game%d", time.Now().Unix())
		lock.Unlock()

		go GetChessData()

		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		json.NewEncoder(w).Encode(map[string]string{
			"gameID": currentGameID,
		})
	})

	http.HandleFunc("/api/game/", func(w http.ResponseWriter, r *http.Request) {
		log.Printf("Responding to %s/api/game/**%s request\n", Cyan, Reset)

		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")

		gameResult := GetGameResult()
		err := json.NewEncoder(w).Encode(gameResult)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	})

	// Start a new game when the server starts
	go GetChessData()

	port := ":8080"
	fmt.Printf("\n%s%sMock Lichess server listening on localhost%s%s\n\n", Bold, Green, Reset, Reset)
	fmt.Printf("  %s➜  %sLocal:   %shttp://localhost%s/%s\n\n", Green, White, Cyan, port, Reset)
	fmt.Printf("  %s➜  %sEndpoint: %s/api/tv/feed%s\n", Green, White, Cyan, Reset)
	fmt.Printf("  %s➜  %sEndpoint: %s/api/game/%s\n", Green, White, Cyan, Reset)
	fmt.Printf("  %s➜  %sEndpoint: %s/api/new-game%s\n\n", Green, White, Cyan, Reset)

	err := http.ListenAndServe(port, nil)
	if err != nil {
		fmt.Printf("%sServer failed to start: %v%s\n", Red, err, Reset)
	}
}

