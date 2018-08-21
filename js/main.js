var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', {
	preload: preload,
	create: create,
	update: update,
	render: render
});

var bg_music;

var score_panel;
var round = 0;
var round_label;
var round_timer;
var timer_label;
var hint_label;

var guideline_text;
var guideline_Y = 0;

var SQUARE_SIZE = 60;
var BOARD_COLS;
var BOARD_ROWS;
var map;
var squareSearchMap;
var terrain;
var dijkstraTerrain;
var animals = [];

var money = 2000;

var next_button;

function preload() {
    game.load.image("title", 'assets/pics/title.png', 530,128)
    game.load.spritesheet('grass', 'assets/pics/grass.png', 600, 600);
    game.load.spritesheet('score_panel', 'assets/pics/score_panel.png', 200, 600);
    game.load.spritesheet('SQUARES', 'assets/pics/fences.png', 32, 32);
    game.load.spritesheet('chicken', 'assets/pics/chicken.png', 32, 32);
    game.load.spritesheet('golden_chicken', 'assets/pics/golden_chicken.png', 32, 32);
    game.load.spritesheet('evil_chicken', 'assets/pics/evil_chicken.png', 32, 32);
    game.load.spritesheet('cow', 'assets/pics/cow.png', 32, 32);
    game.load.spritesheet('red_bull', 'assets/pics/red_bull.png', 32, 32);
    game.load.spritesheet('escapeman', 'assets/pics/escapeman.png', 32, 32);
    game.load.audio('bg_music', 'assets/audios/bg_music.ogg');
    game.load.audio('fences_noise1', 'assets/audios/fences_noise1.ogg');
    game.load.audio('fences_noise2', 'assets/audios/fences_noise2.ogg');
    game.load.audio('chicken_bwak1', 'assets/audios/chicken_bawk1.ogg');
    game.load.audio('chicken_bwak2', 'assets/audios/chicken_bawk2.ogg');
    game.load.audio('chicken_bwak3', 'assets/audios/chicken_bawk3.ogg');
    game.load.audio('chicken_bwak4', 'assets/audios/chicken_bawk4.ogg');
    game.load.audio('cow_moo1', 'assets/audios/cow_moo1.ogg');
    game.load.audio('cow_moo2', 'assets/audios/cow_moo2.ogg');
    game.load.audio('cow_moo3', 'assets/audios/cow_moo3.ogg');
    game.load.audio('escapeman_sound1', 'assets/audios/escapeman_sound1.ogg');
    game.load.audio('escapeman_sound2', 'assets/audios/escapeman_sound2.ogg');
    game.load.audio('escapeman_sound3', 'assets/audios/escapeman_sound3.ogg');
    game.load.audio('escapeman_sound4', 'assets/audios/escapeman_sound4.ogg');
}



function create() {
    document.getElementById("load_image_hint").innerText = "Darg Animal by Mouse";

    bg_music = game.add.audio('bg_music',0.8,true);

    game_panel = game.add.sprite(0, 0, 'grass');

    score_panel = game.add.sprite(600, 0, 'score_panel');


    title_pic = game.add.sprite(score_panel.x+5, 40, 'title');
    title_pic.width = 200;
    title_pic.height = 45;

    author_label = game.add.text(score_panel.width/2+score_panel.x, 550, "Ludum Dare 31\n  by Morshues");
    author_label.anchor.set(0.5);

    author_label.font = 'Arial Black';
    author_label.fontSize = 20;
    author_label.fontWeight = 'bold';

    round_label = game.add.text(score_panel.width/2+score_panel.x, 130, Level[round].label);
    round_label.anchor.set(0.5);

    round_label.font = 'Arial Black';
    round_label.fontSize = 36;
    round_label.fontWeight = 'bold';

    time_label = game.add.text(score_panel.width/2+score_panel.x, 280, "Time");
    time_label.anchor.set(0.5);

    time_label.font = 'Arial Black';
    time_label.fontSize = 36;
    time_label.fontWeight = 'bold';

    timer_label = game.add.text(score_panel.width/2+score_panel.x, 320, 0);
    timer_label.anchor.set(0.5);

    timer_label.font = 'Arial Black';
    timer_label.fontSize = 36;
    timer_label.fontWeight = 'bold';

    hint_label = game.add.text(score_panel.width/2+score_panel.x, 200, "");
    hint_label.anchor.set(0.5);

    hint_label.font = 'Arial Black';
    hint_label.fontSize = 16;


    live = game.add.text(score_panel.width/2+score_panel.x, 480, '$ = ' + money);
    live.anchor.set(0.5);

    live.font = 'Arial Black';
    live.fontSize = 30;
    live.fontWeight = 'bold';

    live.stroke = '#000000';
    live.strokeThickness = 6;
    live.fill = '#FFFF00';


    guideline_text = game.add.text(game.world.centerX, 0, "");
    guideline_text.anchor.set(0.5);

    guideline_text.font = 'Arial Black';
    guideline_text.fontSize = 30;

    guideline_text.stroke = '#000000';
    guideline_text.strokeThickness = 6;
    guideline_text.fill = '#FFFFFF';


    startLevel();


    // an_animal = game.add.sprite(game.world.centerX, game.world.centerY, 'ic_launcher');
    // an_animal.anchor.set(0.5);
    // an_animal.smoothed = false;
    // //game.physics.arcade.enable(an_animal);

    // an_animal.inputEnabled = true;
    // an_animal.input.enableDrag();

    // an_animal.events.onDragStart.add(startDrag, this);
    // an_animal.events.onDragStop.add(stopDrag, this);
}

var guideline_wait = false;
var wait_count = 0;
function update() {
    guideline_text.parent.bringToTop(guideline_text);
    if (guideline_text.y < game.world.height/2) {
        guideline_text.y += 20;
    } else if (!guideline_wait) {
        if (wait_count < 60) {
            wait_count++;
        } else {
            wait_count = 0;
            guideline_wait = true;
        }
    } else if (guideline_text.y < game.world.height) {
        guideline_text.y += 20;
    } else {
        if (textList != null && textList.length != 0) {
            guideline_wait = false;
            wait_count = 0;
            var text_detail = textList.pop(0);
            guideline_text.setText(text_detail.t);
            guideline_text.fontSize = text_detail.s;
            guideline_text.y = 0;
        } else {
            if (newLevel) {
                guideline_text.setText("");
                guideline_end();

            }
        }
    }
    for (var i = 0; i < animals.length; i++) {
        move(animals[i]);
    }

}

function render() {
    timer_label.setText((round_timer.duration/1000).toFixed(1));
    live.setText('$ = ' + money);
	//game.debug.inputInfo(32, 32);
}

function newRound() {
    round++;
    if (Level[round] == null) {
        win();
        return;
    }

    round_label.setText(Level[round].label);

    if (map != null) {
        while (map.length != 0) {
            square = map.pop();
            square.destroy();
        }
        squareSearchMap = [];
    }

    if (animals != null) {
        while (animals.length != 0) {
            animal = animals.pop();
            animal.destroy();
        }
    }


    next_button = game.add.text(game.world.centerY, game.world.centerY, 'NEXT \n      LEVEL');
    next_button.anchor.set(0.5);

    next_button.font = 'Arial Black';
    next_button.fontSize = 80;
    next_button.fontWeight = 'bold';

    next_button.stroke = '#FFFFFF';
    next_button.strokeThickness = 6;
    next_button.fill = '#FF2222';

    next_button.inputEnabled = true;
    next_button.events.onInputDown.add(next, this);
}

function startLevel() {
    newLevel = true;
    spawnMap();

    guideline();

    round_timer = game.time.create(false);
    bg_music.play('',0,0.8,true);
}

var newLevel = false;
function guideline_end() {
    newLevel= false;

    hint_label.setText(Level[round].stayGuide);

    genEnemy();

    round_timer.add(Phaser.Timer.SECOND * Level[round].time, newRound, this);
    round_timer.start();

}

// make map
function spawnMap() {
	map = [];
    squareSearchMap = [];

    terrain = Level[round].terrain;

    dijkstraTerrain = [[]];
    makeDijkstraTerrain(terrain, dijkstraTerrain);

    BOARD_COLS = terrain.length-2;
    BOARD_ROWS = terrain[0].length-2;

    SQUARE_SIZE = Phaser.Math.min(game.world.width / BOARD_COLS, game.world.height / BOARD_ROWS);

    for (var i = 1; i < BOARD_COLS+1; i++)
    {
        squareSearchMap[i] = [];
        for (var j = 1; j < BOARD_ROWS+1; j++)
        {
        	if (terrain[i][j] == 1) {
	            var square = game.add.sprite((i-1) * SQUARE_SIZE, (j-1) * SQUARE_SIZE, "SQUARES");
                square.scaleRatio = SQUARE_SIZE / square.width;
                square.scale.x = square.scaleRatio;
                square.scale.y = square.scaleRatio;
                square.x = (i-1) * SQUARE_SIZE;
                square.y = (j-1) * SQUARE_SIZE;
                square.animations.add('4idle', [0]);
                square.animations.add('4att', [0, 1]);
                square.animations.add('3idle', [2]);
                square.animations.add('3att', [2, 3]);
                square.animations.add('2idle', [4]);
                square.animations.add('2att', [4, 5]);
                square.animations.add('1idle', [6]);    
                square.animations.add('1att', [6, 7]);
                square.terrainX = i;
                square.terrainY = j;
                square.hp = 1000;
                map.push(square);
                squareSearchMap[i][j] = square;
	        }
        }
    }

}

function genEnemy() {
    animals = [];

    var rangeMin = game.world.height*Level[round].enemy_edge.left;
    var rangeMax = game.world.height*Level[round].enemy_edge.right;
    for (var i = 0; i < Level[round].enemyNum; i++) {

        animal = generateAnimal(rangeMin, rangeMax);

        animals.push(animal);   
    }
}

var textList;
function guideline() {
    guideline_wait = false;
    wait_count = 0;
    textList = Level[round].guidelineList;
    text_detail = textList.pop(0);
    guideline_text.setText(text_detail.t);
    guideline_text.fontSize = text_detail.s;
    guideline_text.y = 0;

}

function move(object) {
    if (object.escapeRun == null || object.escapeRun) {
        var direct = window[Enemy[object.modelName].escapeType](object, dijkstraTerrain);
        if (direct.d == 1) {
            object.animations.play('left');
            object.x -= object.escapeSpeed;            
        } else if (direct.d == 2) {
            object.animations.play('right');
            object.x += object.escapeSpeed;

        } else if (direct.d == 3) {
            object.animations.play('up');
            object.y -= object.escapeSpeed;
        } else if (direct.d == 4) {
            object.animations.play('down');
            object.y += object.escapeSpeed;
        } else if (direct.d == 5) {
            switch(object.cow_target) {
                case 1:
                    object.animations.play('left');
                    break;
                case 2:
                    object.animations.play('right');
                    break;
                case 3:
                    object.animations.play('up');
                    break;
                case 4:
                    object.animations.play('down');
                    break;
            }
            attackSquare(squareSearchMap[direct.x][direct.y], 3);
        } else {
            object.escapeRun = false;
            object.destroy();
            money = money - Enemy[object.modelName].price;
            if (money < 0) {
                money = 0;
                lose();
                return;
            }

            var rangeMin = game.world.height*Level[round].enemy_edge.left;
            var rangeMax = game.world.height*Level[round].enemy_edge.right;
            animal = generateAnimal(rangeMin, rangeMax);

            animals.push(animal);   
        }
        object.last_direct = direct.d;
    }

}

function makeDijkstraTerrain(terrain, dijkstraTerrain) {
    var computingSquareList = [];

    // init dijkstra map
    for (var i = 0; i < terrain.length; i++) {
        dijkstraTerrain[i] = [];
        if (i == 0 || i == terrain.length-1) {
            for (var j = 0; j < terrain[0].length; j++) {
                if (terrain[i][j] == 1)
                    dijkstraTerrain[i][j] = 999;
                else {
                    dijkstraTerrain[i][j] = 0;
                    computingSquareList.push({"x":i, "y":j});
                }
            }
        } else {
            if (terrain[i][0] == 1) {
                dijkstraTerrain[i][0] = 999;
            } else {
                dijkstraTerrain[i][0] = 0;
                computingSquareList.push({"x":i, "y":0});
            }
            for (var j = 1; j < terrain[0].length-1; j++) {
                dijkstraTerrain[i][j] = 999;
            }
            if (terrain[i][terrain[0].length-1] == 1) {
                dijkstraTerrain[i][terrain[0].length-1] = 999;
            } else {
                dijkstraTerrain[i][terrain[0].length-1] = 0;
                computingSquareList.push({"x":i, "y":terrain[0].length-1});
            }
        }
    }

    //compute dijkstra map
    var cost = 1;
    while (computingSquareList.length != 0) {
        var nextComputeSquareList = [];
        for (var i = 0; i < computingSquareList.length; i++) {
            posX = computingSquareList[i].x;
            posY = computingSquareList[i].y;
            updateCost(terrain, dijkstraTerrain, posX+1, posY, cost, nextComputeSquareList);
            updateCost(terrain, dijkstraTerrain, posX-1, posY, cost, nextComputeSquareList);
            updateCost(terrain, dijkstraTerrain, posX, posY+1, cost, nextComputeSquareList);
            updateCost(terrain, dijkstraTerrain, posX, posY-1, cost, nextComputeSquareList);
        }
        computingSquareList = nextComputeSquareList;
        cost++;
    }

}

function updateCost(terrain, dijkstraTerrain, pX, pY, cost, nextList) {
    if (pX >= 0 && pX < terrain.length && pY >= 0 && pY < terrain[0].length) {
        if (terrain[pX][pY] != 1 && dijkstraTerrain[pX][pY] > cost) {
            dijkstraTerrain[pX][pY] = cost;
            nextList.push({"x":pX, "y":pY});
        }
    }
}

function generateAnimal(marginMin, marginMax) {
    enemyType = Level[round].enemyType;
    var selector = game.rnd.frac();
    var keys = Object.keys(enemyType);
    var counter = enemyType[keys[0]];
    var index = 0;
    while (counter < selector) {
        index++;
        counter = counter + enemyType[keys[index]];
    }

    var enemyName = keys[index];
    var enemyModel = Enemy[enemyName];

    var enemy;
    enemy = game.add.sprite(game.rnd.integerInRange(marginMin, marginMax), 
                              game.rnd.integerInRange(marginMin, marginMax), 
                              enemyModel.picName);
    enemy.anchor.set(0.5);
    enemy.smoothed = false;

    enemy.inputEnabled = true;
    enemy.scaleRatio = SQUARE_SIZE/enemy.width;
    enemy.width = SQUARE_SIZE;
    enemy.height = SQUARE_SIZE;

    if (enemyName != "evil_chicken") {
        enemy.input.enableDrag();
        enemy.events.onDragStart.add(startDrag, this);
        enemy.events.onDragStop.add(stopDrag, this);        
    }

    enemy.bark_audio_name = enemyModel.bark_audio_name;
    enemy.bark_audio_size = enemyModel.bark_audio_size;
    for (var i = 0; i < enemyModel.animate_list.length; i++) {
         enemy.animations.add(enemyModel.animate_list[i].name, enemyModel.animate_list[i].action);
    }

    enemy.modelName = enemyName;
    enemy.escapeSpeed = game.rnd.integerInRange(enemyModel.speedMin, enemyModel.speedMax) * SQUARE_SIZE / 200;
    return enemy;
}

var attack_sound_delay = 0;
function attackSquare(square, damage) {
    if (damage == null)
        damage = 1;

    square.animations.play(Phaser.Math.floor(square.hp/250+1)+'att');

    attack_sound_delay++;
    if (attack_sound_delay > 100) {
        var fx = game.add.audio("fences_noise"+game.rnd.integerInRange(1, 2));
        fx.play('',0,0.15);
        attack_sound_delay = 0;
    }
    square.hp--;

    if (square.hp == 0) {
        terrain[square.terrainX][square.terrainY] = 0;
        var cost = dijkstraTerrain[square.terrainX-1][square.terrainY];
        if (dijkstraTerrain[square.terrainX+1][square.terrainY] < cost) 
            cost = dijkstraTerrain[square.terrainX+1][square.terrainY];
        if (dijkstraTerrain[square.terrainX][square.terrainY-1] < cost) 
            cost = dijkstraTerrain[square.terrainX][square.terrainY-1];
        if (dijkstraTerrain[square.terrainX][square.terrainY+1] < cost) 
            cost = dijkstraTerrain[square.terrainX][square.terrainY+1];

        if (cost == 999)
            dijkstraTerrain[square.terrainX][square.terrainY] = 999;
        else
            dijkstraTerrain[square.terrainX][square.terrainY] = cost + 1;

        squareSearchMap[square.terrainX][square.terrainY] = null;
        map.pop(square);
        square.destroy();

    }
}



function startDrag(object) {
    object.escapeRun = false;
    object.alpha = 0.6;

    scaleSize = object.scaleRatio*1.2;
    game.add.tween(object.scale).to( { x: scaleSize, y: scaleSize }, 50, Phaser.Easing.Linear.None, true, 0, 0, false);
    var fx = game.add.audio(object.bark_audio_name+game.rnd.integerInRange(1, object.bark_audio_size));
    fx.play();

    if (object.modelName == "escapeman") {
        money += 100;
    }

}

function stopDrag(object) {
    object.escapeRun = true;
    object.alpha = 1;
    object.width = SQUARE_SIZE;
    object.height = SQUARE_SIZE;

    if (object.x >= game.world.height)
        object.x = game.world.height;
    if (object.x < 0)
        object.x = 0;
    if (object.y >= game.world.height)
        object.y = game.world.height;
    if (object.y < 0)
        object.y = 0;

    if (object.modelName == "escapeman") {
        object.x = 0;
        object.y = 0;
    }

}

function next() {
    money = money + Level[round-1].rewards;

    next_button.destroy();

    startLevel();
}

function genResetButton() {
    reset_button = game.add.text(score_panel.width/2+score_panel.x, 400, 'RETRY');
    reset_button.anchor.set(0.5);

    reset_button.font = 'Arial Black';
    reset_button.fontSize = 44;
    reset_button.fontWeight = 'bold';

    reset_button.stroke = '#FFFFFF';
    reset_button.strokeThickness = 6;
    reset_button.fill = '#FF2222';

    reset_button.inputEnabled = true;
    reset_button.events.onInputDown.add(reset, this);    
}

var is_lose = false;
function lose() {
    if (is_lose)
        return;
    is_lose = true;
    round_timer.pause();
    loseLabel = game.add.text(game.world.centerX, game.world.centerY, 'GAME OVER');
    loseLabel.anchor.set(0.5);

    loseLabel.font = 'Arial Black';
    loseLabel.fontSize = 100;
    loseLabel.fontWeight = 'bold';

    loseLabel.stroke = '#000000';
    loseLabel.strokeThickness = 6;
    loseLabel.fill = '#FF0000';    

    loseLabel.setShadow(10, 10, 'rgba(0, 0, 0, 0.6)', 10);

    genResetButton()
}

var is_win = false;
function win() {
    if (is_win)
        return;
    is_win = true;
    round_timer.pause();
    winLabel = game.add.text(game.world.centerX, game.world.centerY - 60, 'GAME CLEAR');
    winLabel.anchor.set(0.5);

    winLabel.font = 'Arial Black';
    winLabel.fontSize = 70;
    winLabel.fontWeight = 'bold';

    winLabel.stroke = '#000000';
    winLabel.strokeThickness = 6;
    winLabel.fill = '#FF0000';    
    
    winLabel.setShadow(8, 8, 'rgba(0, 0, 0, 0.5)', 8);

    winLabel2 = game.add.text(game.world.centerX, game.world.centerY + 60, 'CONGRATULATION!!');
    winLabel2.anchor.set(0.5);

    winLabel2.font = 'Arial Black';
    winLabel2.fontSize = 70;
    winLabel2.fontWeight = 'bold';

    winLabel2.stroke = '#000000';
    winLabel2.strokeThickness = 6;
    winLabel2.fill = '#FF0000';    

    winLabel2.setShadow(8, 8, 'rgba(0, 0, 0, 0.5)', 8);

    genResetButton()
}

function reset() {
    document.location.reload(true);
}