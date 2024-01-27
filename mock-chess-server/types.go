package main

type ChessGame struct {
	T string                 `json:"t"`
	D map[string]interface{} `json:"d"`
}

type Player struct {
	Name    string `json:"name"`
	Title   string `json:"title"`
	Id      string `json:"id"`
	Rating  int    `json:"rating"`
	Seconds int    `json:"seconds"`
}

type GameResult struct {
	Winner  string            `json:"winner,omitempty"`
	Status  string            `json:"status"`
	Players map[string]Player `json:"players,omitempty"`
}
