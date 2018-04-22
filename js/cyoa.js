// CYOA
// 

var _book = {}, _debug = false;

$(document).ready(function () {
	$(window).on('resize', function () {
		didSize();
	});
	didSize();
	$(".menu, .combat").css({ left: -330 });

	$(".burger").click(function (ev) {
		$(".menu").animate({ left: 0 }, 250);
	});

	$(".ova").css({ opacity: .4 }).hide();
	$(".combatOk").click(function (ev) {
		endCombat((_book.sheet.curr_hp <= 0) ? _book.curr_combat.defeat : _book.curr_combat.victory);
	});
	$(".attOpt").click(function () {
		if (!_book.curr_combat.cd) {
			var d = roll(100);
			var s = "[Roll 1d100 = " + d + "] ";
			if (d >= 100 - _book.curr_combat.tohit) {
				s += "Hit!";
				_book.curr_combat.curr_hp -= _book.sheet.dps;
				updateCombatUI();
				combatAnim('.slash', .8, 250, function () { combatTick(); });
			} else {
				s += "Miss!";
				setTimeout(combatTick, 250);
			}
			doCooldown(1500);
			logCombat(s);
		}
	});
	$(".magOpt").click(function () {
		if (!_book.curr_combat.cd) {
			doCooldown(1500);
		}	
	});
	$(".iteOpt").click(function () {
		if (!_book.curr_combat.cd) {
			doCooldown(1500);
		}
	});

	$(document).on('click', '.choice', function (ev) {
		var i = $(ev.target).attr('id').split('_');
		if (i.length < 2 || i[0] !== 'jump') return;

		if (i[1] < 0) {
			handleAction(i[2]);
		} else {
			jumpToPage(i[1]);
		}
	})

	initializeBook();
});

function didSize() 
{
	$(".menu").height($(".ui").height());
	$(".ova").height($(".ui").height());
}

function handleAction(i)
{
	var r = roomById(_book.current);
	if (r == undefined || r.opts.length <= i || r.opts[i].act == undefined)
		return;

	switch (r.opts[i].act) {
		default: break;
		case 'combat':
			if (r.combat != undefined) {
				startCombat(r.combat);
			}
			break;
		case 'run':
			break;
	}
}

function roll(d) 
{
	return Math.floor(Math.random() * d) + 1
}

function jumpToPage(idx)
{
	$(".main").animate({ opacity: 0.0 }, 100, function () {
		_book.current = idx;
		setupRoom();	
		$(".main").animate({ opacity: 1.0 }, 100);
	});
}

function startCombat(m)
{
	$(".combat > div").hide();
	$(".combat .oppo").html(m.name).show();
	$(".combat .fight").show();
	$(".combat .log").html("").show();
	$(".ova").show();
	$(".combat").css({ top: 100 }).animate({ left: 20 }, 50);

	m.curr_hp = m.max_hp;
	_book.curr_combat = m;

	logCombat("Begin Combat: " + m.name);
	updateCombatUI();
}

function doCooldown(cd) 
{
	_book.curr_combat.cd = true;
	$(".combatoptions img").css({ opacity: .25 });
	setTimeout(function () {
		$(".combatoptions img").animate({ opacity: 1.0 }, 50, function () {
			_book.curr_combat.cd = false;
		});
	}, cd);
}

function logCombat (m)
{
	$(".combat .log").append("<div>" + m + "</div>").animate({ scrollTop: $(".combat .log").prop("scrollHeight") - $(".combat .log").height() }, 10);
}

function termCombat(ttl, msg, btn)
{
	$(".combat > div").hide();
	$(".combat .res .ttl").html(ttl).show();
	$(".combat .res .msg").html(msg).show();
	$(".combat .res .btn").html(btn).show();
	$(".combat .res").show();
}

function endCombat(idx)
{
	$(".combat").animate({ left: -330 }, 50, function () {
		$(".ova").hide();
		jumpToPage(idx);
	});
}

function combatTick()
{
	if (checkForEndOfCombat())
		return;

	var d = roll(100);
	var s = "[Roll 1d100 = " + d + "] ";
	if (d >= 100 - _book.sheet.tohit) {
		_book.sheet.curr_hp -= _book.curr_combat.dps;
		combatAnim(".blooda", .8, 250);
		combatAnim(".bloodb", .5, 750);
		s += "The monster hit you!";
	} else {
		s += "The monster missed.";
	}
	logCombat(s);

	updateCombatUI();
	checkForEndOfCombat();
}

function checkForEndOfCombat()
{
	if (_book.sheet.curr_hp <= 0) {
		termCombat("You were defeated!", "You have been killed! :(", "Okay");
		return true;
	} else if (_book.curr_combat.curr_hp <= 0) {
		termCombat("You are triumphant!", "You have defeated your foe!", "Okay");
		return true;
	} else {
		return false;
	}
}

function updateCombatUI()
{
	$(".plyrHp .bar").width("" + (64.0 * (_book.sheet.curr_hp / _book.sheet.max_hp)));
	$(".oppoHp .bar").width("" + (64.0 * (_book.curr_combat.curr_hp / _book.curr_combat.max_hp)));
}

function combatAnim(name, opa, dt, cb)
{
	$(name).css({ opacity: opa }).show().animate({ opacity: 0.0 }, dt, function () { $(name).hide(); if (cb != undefined) cb(); });
}

function setupRoom()
{
	var r = roomById(_book.current);
	if (r == undefined)
		return;

	$(".chapter").html(r.title);
	$(".prose").html(r.prose);

	$(".opts").children().remove();
	for (var i = 0, n = r.opts.length; i < n; i++)
		$(".opts").append("<div class='choice' id='jump_" + r.opts[i].jump + "_" + i + "'>" + r.opts[i].prompt + "</div>")
}

function roomById(id) 
{
	for (var i = _book.rooms.length - 1; i >= 0; i--) {
		if (_book.rooms[i].id == id)
			return _book.rooms[i];
	}

	return null;
}

function save() {
	var data = {
		current: _book.current,
		prev: _book.prev,
		sheet: {
			curr_hp: _book.sheet.curr_hp,
			max_hp: _book.sheet.max_hp,
			dps: _book.sheet.dps,
			tohit: _book.sheet.tohit
		}
	};

	localStorage.setItem("save_game", escape(JSON.stringify(data)));
}

function load() {
	var data = JSON.parse(unescape(localStorage.getItem("save_game")));
	_book.current = data.current;
	_book.prev = data.prev;
	_book.sheet.curr_hp = data.sheet.curr_hp;
	_book.sheet.max_hp = data.sheet.max_hp;
	_book.sheet.dps = data.sheet.dps;
	_book.sheet.tohit = data.sheet.tohit;
}

function initializeBook()
{
	if (_debug) {
		_book = {
			current: 0, prev: 0,
			sheet: {
				curr_hp: 10, max_hp: 10, dps: 2, tohit: 65
			},
			curr_combat: {},
			rooms: [
				{
					id: 0,
					title: 'A Fresh Start',
					type: 'text',
					prose: 'This is the begining of the story. Who knows where we\'ll go from here?',
					opts: [
						{ prompt: 'Begin the adventure ...', jump: 0 },
						{ prompt: 'TEST: COMBAT', jump: 2 },
						{ prompt: 'What\s this all about?' , jump: 1 }
					]
				}, 
				{
					id: 1,
					title: 'What is this?',
					type: 'text',
					prose: 'ABOUT THIS BOOK',
					opts: [
						{ prompt: 'Got it!', jump: 0 }
					]
				}, 
				{
					id: 2,
					title: 'TEST -- COMBAT',
					type: 'combat',
					prose: 'A test opponent has appeared!',
					combat: {
						name: 'A Test Opponent',
						curr_hp: 10, max_hp: 10, tohit: 65, dps: 1, 
						victory: 0, defeat: 0
					},
					opts: [
						{ prompt: 'Fight', jump: -1, act: 'combat' },
						{ prompt: 'Run Away', jump: -1, act: 'run' }
					]
				}
			]
		};
		setupRoom();
	} else {
		$.getJSON("./books/intro_book.js", function (ret) {
			_book = ret;
			setupRoom();
		});
	}
}