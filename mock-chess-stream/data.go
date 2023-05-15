package main

func GetChessData() []ChessGame {
	return []ChessGame{
		{
			T: "featured",
			D: map[string]interface{}{
				"id":          "k34yIECG",
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
				"fen": "1r6/4q1k1/3nr1p1/pp1p1p2/2nP3p/2PBPP2/2Q1RKPP/2B1R3 w - - 2 32",
			},
		},
		{
			T: "fen",
			D: map[string]interface{}{
				"fen": "1r6/4q1k1/3nr1p1/pp1p1p2/2nP3p/2PBPP2/2Q1R1PP/2B1R1K1 b - - 3 32",
				"lm":  "f2g1",
				"wc":  90,
				"bc":  64,
			},
		},
		{
			T: "fen",
			D: map[string]interface{}{
				"fen": "1r6/4q1k1/3nr1p1/p2p1p2/1pnP3p/2PBPP2/2Q1R1PP/2B1R1K1 w - - 0 33",
				"lm":  "b5b4",
				"wc":  90,
				"bc":  62,
			},
		},
		{
			T: "fen",
			D: map[string]interface{}{
				"fen": "1r6/4q1k1/3nr1p1/p2p1p2/1PnP3p/3BPP2/2Q1R1PP/2B1R1K1 b - - 0 33",
				"lm":  "c3b4",
				"wc":  88,
				"bc":  62,
			},
		},
		{
			T: "featured",
			D: map[string]interface{}{
				"id":          "k34fIECG",
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
				"fen": "1r6/4q1k1/3nr1p1/pp1p1p2/2nP3p/2PBPP2/2Q1RKPP/2B1R3 w - - 2 32",
			},
		},
		{
			T: "fen",
			D: map[string]interface{}{
				"fen": "1r6/4q1k1/3nr1p1/pp1p1p2/2nP3p/2PBPP2/2Q1R1PP/2B1R1K1 b - - 3 32",
				"lm":  "f2g1",
				"wc":  90,
				"bc":  64,
			},
		},
		{
			T: "fen",
			D: map[string]interface{}{
				"fen": "1r6/4q1k1/3nr1p1/p2p1p2/1pnP3p/2PBPP2/2Q1R1PP/2B1R1K1 w - - 0 33",
				"lm":  "b5b4",
				"wc":  90,
				"bc":  62,
			},
		},
		{
			T: "fen",
			D: map[string]interface{}{
				"fen": "1r6/4q1k1/3nr1p1/p2p1p2/1PnP3p/3BPP2/2Q1R1PP/2B1R1K1 b - - 0 33",
				"lm":  "c3b4",
				"wc":  88,
				"bc":  62,
			},
		},
	}
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
