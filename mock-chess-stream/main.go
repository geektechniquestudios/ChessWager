package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
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

func main() {
	http.HandleFunc("/api/tv/feed", func(w http.ResponseWriter, r *http.Request) {
		log.Printf("Responding to %s/api/tv/feed%s request\n", Cyan, Reset)
		data := GetChessData()

		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Content-Type", "application/x-ndjson")
		w.Header().Set("Transfer-Encoding", "chunked")

		for _, item := range data {
			jsonData, err := json.Marshal(item)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			_, err = w.Write(append(jsonData, '\n'))
			if err != nil {
				log.Printf("Error writing response: %v", err)
				return
			}

			if f, ok := w.(http.Flusher); ok {
				f.Flush()
			}

			time.Sleep(3 * time.Second)
		}
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
