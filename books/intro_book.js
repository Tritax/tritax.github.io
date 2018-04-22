{
	index: 0,
	rooms: [
		{
			id: 0,
			title: 'A Fresh Start',
			prose: 'This is the begining of the story. Who knows where we\'ll go from here?',
			opts: [
				{ prompt: 'Begin the adventure ...', jump: 0 },
				{ prompt: 'Give up and go home!', jump: 0 },
				{ prompt: 'What\s this all about?' , jump: 1 }
			]
		}, 
		{
			id: 1,
			title: 'What is this?',
			prose: 'ABOUT THIS BOOK',
			opts: [
				{ prompt: 'Got it!', jump: 0 }
			]
		}
	]
};