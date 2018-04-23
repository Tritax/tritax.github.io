{
	"current": 0, "prev": 0,
	"sheet": {
		"curr_hp": 10, "max_hp": 10, "dps": 1, "tohit": 65
	},
	"curr_combat": {},
	"flags": [],
	"rooms": [
		{
			"id": 0,
			"title": "A Fresh Start",
			"type": "text",
			"prose": "This is the begining of the story. Who knows where we'll go from here?",
			"action": function () {
				resetBook();
			},
			"opts": [
				{ "prompt": "Begin the adventure ...", "jump": 43 },
				{ "prompt": "TEST: COMBAT", "jump": 2, "hide": true },
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
		}, 
		{
			"id": 3,
			"title": "Outside old graveyard",
			"type": "prose",
			"prose": "",
			"action": function () {
				if (_book.flags["hpots"] < 1)
					_book.flags["hpots"] = 1;
			},
			"opts": [
				{ "prompt": "Enter the ruins", "jump": 4, "act": "" },
				{ "prompt": "Look around", "jump": 5, "act": "" }, 
				{ "prompt": "Return to Town", "jump": 0, "act": "" }
			]
		}, 
		{
			"id": 4,
			"title": "In an old graveyard",
			"type": "combat",
			"prose": "",
			"combat": {
				"name": "Skeleton",
				"curr_hp": 10, "max_hp": 10, "tohit": 65, "dps": 1, 
				"victory": 7, "defeat": 6
			},
			"opts": [
				{ "prompt": "Fight", "jump": -1, "act": "combat" }
			]
		}, 
		{
			"id": 5,
			"title": "Outside the ruins",
			"type": "prose",
			"prose": "",
			"action": function () {
				_book.sheet.dps++;
			},
			"opts": [
				{ "prompt": "Enter the ruins", "jump": 4, "act": "" }
			]
		}, 
		{
			"id": 6,
			"title": "You have died.",
			"type": "prose",
			"prose": "",
			"action": function() {},
			"opts": [
				{ "prompt": "Return to Menu", "jump": 0, "act": "" }
			]
		}, 
		{
			"id": 7,
			"title": "In an old graveyard",
			"type": "prose",
			"prose": "",
			"action": function() {
				resetCombatForRoom(8);
			},
			"combat": null,
			"opts": [
				{ "prompt": "Search", "jump": 8, "act": "" },
				{ "prompt": "Enter the tomb", "jump": 9, "act": "" },
				{ "prompt": "Leave the graveyard", "jump": 3, "act": "" }
			]
		}, 
		{
			"id": 8,
			"title": "In an old graveyard",
			"type": "prose",
			"prose": "",
			"action": function() {},
			"combat": {
				"name": "Skeleton",
				"curr_hp": 10, "max_hp": 10, "tohit": 65, "dps": 1, 
				"victory": 7, "defeat": 6
			},
			"opts": [
				{ "prompt": "Fight", "jump": -1, "act": "combat" }
			]
		}, 
		{
			"id": 9,
			"title": "Inside the tomb",
			"type": "prose",
			"prose": "",
			"action": function() {},
			"combat": null,
			"opts": [
				{ "prompt": "Return to the graveyard", "jump": 7, "act": "" },
				{ "prompt": "Steal family jewelry", "jump": 10, "act": "" },
				{ "prompt": "Open the vault", "jump": 11, "act": "" },
				{ "prompt": "Search the tomb", "jump": 12, "act": "" }
			]
		}, 
		{
			"id": 10,
			"title": "Inside the tomb",
			"type": "combat",
			"prose": "",
			"action": function() {},
			"combat": {
				"name": "Skeleton Lord",
				"curr_hp": 10, "max_hp": 10, "tohit": 65, "dps": 2, 
				"victory": 9, "defeat": 6
			},
			"opts": [
				{ "prompt": "Fight", "jump": -1, "act": "combat" }
			]
		}, 
		{
			"id": 11,
			"title": "Inside the tomb",
			"type": "prose",
			"prose": "",
			"action": function() {},
			"combat": null,
			"opts": [
				{ "prompt": "Descend into the darkness", "jump": 13, "act": "" },
				{ "prompt": "Return to the graveyard", "jump": 7, "act": "" }
			]
		}, 
		{
			"id": 12,
			"title": "Inside the tomb",
			"type": "prose",
			"prose": "",
			"action": function() {
				_book.flags["lhall_trap"] = 1;
			},
			"combat": null,
			"opts": [
				{ "prompt": "Okay", "jump": 9, "act": "" }
			]
		}, 
		{
			"id": 13,
			"title": "Lower Hallway",
			"type": "prose",
			"prose": "",
			"ext": "",
			"action": function() {
				if (_book.flags["lhall_trap"] != 1) {
					//_book.curr_hp--;
					//checkDeath
					//roomById(13).ext = "";
					_book.flags["lhall_trap"] = 1;
				}
			},
			"combat": null,
			"opts": [
				{ "prompt": "Sneak up on the orc", "jump": 14, "act": "" },
				{ "prompt": "Charge!", "jump": 15, "act": "" }
			]
		}, 
		{
			"id": 14,
			"title": "",
			"type": "combat",
			"prose": "",
			"action": function() {
				roomById(14).combat.curr_hp = 5;
			},
			"combat": {
				"name": "",
				"curr_hp": 12, "max_hp": 12, "tohit": 65, "dps": 1, 
				"victory": 16, "defeat": 6
			},
			"opts": [
				{ "prompt": "Fight", "jump": -1, "act": "combat" }
			]
		}, 
		{
			"id": 15,
			"title": "",
			"type": "combat",
			"prose": "",
			"action": function() {},
			"combat": {
				"name": "",
				"curr_hp": 12, "max_hp": 12, "tohit": 65, "dps": 1, 
				"victory": 16, "defeat": 6
			},
			"opts": [
				{ "prompt": "Fight", "jump": -1, "act": "combat" }
			]
		}, 
		{
			"id": 16,
			"title": "Lower Hallway",
			"type": "prose",
			"prose": "",
			"action": function() {},
			"combat": null,
			"opts": [
				{ "prompt": "Head down the hallway", "jump": 17, "act": "" },
				{ "prompt": "Climb up to the tomb", "jump": 11, "act": "" }
			]
		}, 
		{
			"id": 17,
			"title": "Underground Crossroads",
			"type": "prose",
			"prose": "",
			"action": function() {},
			"combat": null,
			"opts": [
				{ "prompt": "North", "jump": 16, "act": "" },
				{ "prompt": "South", "jump": 18, "act": "" },
				{ "prompt": "East", "jump": 19, "act": "" },
				{ "prompt": "West", "jump": 20, "act": "" }
			]
		}, 
		{
			"id": 18,
			"title": "Web-covered Hallway",
			"type": "prose",
			"prose": "",
			"action": function() {},
			"combat": null,
			"opts": [
				{ "prompt": "Burn through the webs", "jump": 21, "act": "" },
				{ "prompt": "Return to the crossroads", "jump": 17, "act": "" }
			]
		}, 
		{
			"id": 19,
			"title": "Altar room",
			"type": "prose",
			"prose": "",
			"action": function() {},
			"combat": null,
			"opts": [
				{ "prompt": "Smash the urns", "jump": 22, "act": "" },
				{ "prompt": "Return to the crossroads", "jump": 17, "act": "" }
			]
		}, 
		{
			"id": 20,
			"title": "Library",
			"type": "prose",
			"prose": "",
			"action": function() {},
			"combat": null,
			"opts": [
				{ "prompt": "Search through the tomes", "jump": 23, "act": "" },
				{ "prompt": "Attempt to rest", "jump": 24, "act": "" },
				{ "prompt": "Return to the crossroads", "jump": 17, "act": "" }
			]
		}, 
		{
			"id": 21,
			"title": "Web-covered Hallway",
			"type": "prose",
			"prose": "",
			"action": function() {},
			"combat": {
				"name": "Giant Spider",
				"curr_hp": 8, "max_hp": 8, "tohit": 65, "dps": 2, 
				"victory": 27, "defeat": 6
			},
			"opts": [
				{ "prompt": "Fight", "jump": -1, "act": "combat" }
			]
		}, 
		{
			"id": 22,
			"title": "Altar room",
			"type": "prose",
			"prose": "",
			"action": function() {
				_book.flags["urns_smash"] = 1;
			},
			"combat": {
				"name": "Skeleton",
				"curr_hp": 10, "max_hp": 10, "tohit": 65, "dps": 1, 
				"victory": 19, "defeat": 6
			},
			"opts": [
				{ "prompt": "Fight", "jump": -1, "act": "combat" }
			]
		}, 
		{
			"id": 23,
			"title": "Library",
			"type": "prose",
			"prose": "",
			"action": function() {},
			"combat": null,
			"opts": [
				{ "prompt": "Okay", "jump": 20, "act": "" }
			]
		}, 
		{
			"id": 24,
			"title": "",
			"type": "prose",
			"prose": "",
			"action": function() {
				jumpToPage(roll(100) > 50 ? 25 : 26);
			},
			"combat": null,
			"opts": []
		}, 
		{
			"id": 25,
			"title": "Library",
			"type": "prose",
			"prose": "",
			"action": function() {},
			"combat": null,
			"opts": [
				{ "prompt": "Okay", "jump": 20, "act": "" }
			]
		}, 
		{
			"id": 26,
			"title": "Library",
			"type": "prose",
			"prose": "",
			"action": function() {},
			"combat": {
				"name": "Orc Guard",
				"curr_hp": 10, "max_hp": 10, "tohit": 65, "dps": 1, 
				"victory": 20, "defeat": 6
			},
			"opts": [
				{ "prompt": "Fight", "jump": -1, "act": "combat" }
			]
		}, 
		{
			"id": 27,
			"title": "Web-covered Hallway",
			"type": "prose",
			"prose": "",
			"action": function() {},
			"combat": null,
			"opts": [
				{ "prompt": "Return to the crossroads", "jump": 17, "act": "" },
				{ "prompt": "Descend into the dark hole", "jump": 28, "act": "" }
			]
		}, 
		{
			"id": 28,
			"title": "Dark Tunnels",
			"type": "prose",
			"prose": "",
			"action": function() {},
			"combat": null,
			"opts": [
				{ "prompt": "Explore the tunnels", "jump": 29, "act": "" },
				{ "prompt": "Go back up", "jump": 27, "act": "" }
			]
		}, 
		{
			"id": 29,
			"title": "Temple Entryway",
			"type": "prose",
			"prose": "",
			"action": function() {},
			"combat": null,
			"opts": [
				{ "prompt": "West", "jump": 30, "act": "" },
				{ "prompt": "East", "jump": 31, "act": "" }
			]
		}, 
		{
			"id": 30,
			"title": "Temple Room with a cage",
			"type": "prose",
			"prose": "",
			"action": function() {
				// check if knight is freed, jump to proper locale
				jumpToPage(_book.flags["knight"] == 1 ? 33 : 32);
			},
			"combat": null,
			"opts": []
		}, 
		{
			"id": 31,
			"title": "Temple Throne Room",
			"type": "prose",
			"prose": "",
			"action": function() {
				// check if lich is defeated, jump to proper locale
				jumpToPage(_book.flags["book"] ? 40 : (_book.flags["lich"] == 1 ? 35 : 34));
			},
			"combat": null,
			"opts": []
		}, 
		{
			"id": 32,
			"title": "Temple room with a cage",
			"type": "prose",
			"prose": "",
			"action": function() {},
			"combat": null,
			"opts": [
				{ "prompt": "Rescue the imprisoned knight", "jump": 36, "act": "" },
				{ "prompt": "Return to the Entryway", "jump": 29, "act": "" }
			]
		}, 
		{
			"id": 33,
			"title": "Temple room with a cage",
			"type": "prose",
			"prose": "",
			"action": function() {},
			"combat": null,
			"opts": [
				{ "prompt": "Return to the entryway", "jump": 29, "act": "" }
			]
		}, 
		{
			"id": 34,
			"title": "Temple Throne Room",
			"type": "prose",
			"prose": "",
			"action": function() {},
			"combat": {
				"name": "",
				"curr_hp": 10, "max_hp": 10, "tohit": 65, "dps": 1, 
				"victory": 41, "defeat": 6
			},
			"opts": [
				{ "prompt": "Fight", "jump": -1, "act": "combat" }
			]
		}, 
		{
			"id": 35,
			"title": "Temple Throne Room",
			"type": "prose",
			"prose": "",
			"action": function() {},
			"combat": null,
			"opts": [
				{ "prompt": "Take the holy book", "jump": 39, "act": "" }
			]
		}, 
		{
			"id": 36,
			"title": "Temple room with a cage",
			"type": "prose",
			"prose": "",
			"action": function() {
				_book.flags["knight"] = 1;
			},
			"combat": null,
			"opts": [
				{ "prompt": "No thank you, I'll be fine.", "jump": 37, "act": "" },
				{ "prompt": "I'm more than capable <slap>", "jump": 37, "act": "" }
			]
		}, 
		{
			"id": 37,
			"title": "Temple room with a cage",
			"type": "prose",
			"prose": "",
			"action": function() {},
			"combat": null,
			"opts": [
				{ "prompt": "Okay", "jump": 33, "act": "" }
			]
		}, 
		{
			"id": 38,
			"title": "Temple room with a cage",
			"type": "prose",
			"prose": "",
			"action": function() {},
			"combat": null,
			"opts": [
				{ "prompt": "Okay", "jump": 33, "act": "" }
			]
		}, 
		{
			"id": 39,
			"title": "Temple Throne Room",
			"type": "prose",
			"prose": "",
			"action": function() {
				_book.flags["book"] = 1;
			},
			"combat": null,
			"opts": [
				{ "prompt": "Okay", "jump": 40, "act": "" }
			]
		}, 
		{
			"id": 40,
			"title": "Temple Throne Room",
			"type": "prose",
			"prose": "",
			"action": function() {},
			"combat": null,
			"opts": [
				{ "prompt": "Return to the entryway", "jump": 29, "act": "" }
			]
		}, 
		{
			"id": 41,
			"title": "",
			"type": "prose",
			"prose": "",
			"action": function() {
				jumpToPage(_book.flags["urns_smash"] == 1 ? 35 : 42);
			},
			"combat": null,
			"opts": []
		}, 
		{
			"id": 42,
			"title": "Temple Entryway",
			"type": "prose",
			"prose": "",
			"action": function() {
				var r = roomById(34);
				r.combat.curr_hp = r.combat.max_hp;
			},
			"combat": null,
			"opts": [
				{ "prompt": "Okay", "jump": 29, "act": "" }
			]
		},
		{
			"id": 43,
			"title": "Prologue",
			"type": "prose",
			"prose": "<p>&quot;You&apos;re certain you want to do this for us?&quot; She was nervous. &quot;Everyone who&apos;s gone there has never returned.&quot;</p><p>&quot;I&apos;m sure things will be fine,&quot; you said and hoped your smile calmed her. She was more at ease a few minutes ago &mdash; laughing and drinking &mdash; but, after conversation turned to the cursed monastery near the town &hellip; &quot;I&apos;ll take care of this curse, but I can&apos;t do it for free.&quot;</p><p>&quot;Of course,&quot; a man who called himself the mayor offered. &quot;We&apos;d gladly pay you for you troubles.&quot;</p><p>In the morning, you saddled up your horse and headed into the forest. It was nearly a two day ride from town, but you finally arrived at the ruined remains of a forgotten monastery deep in the forest. You tied your horse to a nearby fence post and surveyed the graveyard adjacent to the dilapidated building. </p><p>A cool wind blew through the trees and rustled your hair. </p>",
			"action": function() {},
			"combat": null,
			"opts": [
				{ "prompt": "Okay", "jump": 3, "act": "" }
			]
		}, 
		{
			"id": 99,
			"title": "",
			"type": "prose",
			"prose": "",
			"action": function() {},
			"combat": {
				"name": "",
				"curr_hp": 10, "max_hp": 10, "tohit": 65, "dps": 1, 
				"victory": 0, "defeat": 0
			},
			"opts": [
				{ "prompt": "", "jump": -1, "act": "" },
				{ "prompt": "", "jump": -1, "act": "" }
			]
		}
	]
};