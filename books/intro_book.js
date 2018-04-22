{
	"current": 0, "prev": 0,
	"sheet": {
		"curr_hp": 10, "max_hp": 10, "dps": 2, "tohit": 65
	},
	"curr_combat": {},
	"rooms": [
		{
			"id": 0,
			"title": "A Fresh Start",
			"type": "text",
			"prose": "This is the begining of the story. Who knows where we'll go from here?",
			"opts": [
				{ "prompt": "Begin the adventure ...", "jump": 0 },
				{ "prompt": "TEST: COMBAT", "jump": 2 },
				{ "prompt": "What's this all about?" , "jump": 1 }
			]
		}, 
		{
			"id": 1,
			"title": "What is this?",
			"type": "text",
			"prose": "ABOUT THIS BOOK",
			"opts": [
				{ "prompt": "Got it!", "jump": 0 }
			]
		}, 
		{
			"id": 2,
			"title": "TEST -- COMBAT",
			"type": "combat",
			"prose": "A test opponent has appeared!",
			"combat": {
				"name": "A Test Opponent",
				"curr_hp": 10, "max_hp": 10, "tohit": 65, "dps": 1, 
				"victory": 0, "defeat": 0
			},
			"opts": [
				{ "prompt": "Fight", "jump": -1, "act": "combat" },
				{ "prompt": "Run Away", "jump": -1, "act": "run" }
			]
		}
	]
};