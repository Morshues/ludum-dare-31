var Enemy = {
    chicken:{
        picName: "chicken",
        price: 10,
        speedMin: 3,
        speedMax: 7,
        bark_audio_name: "chicken_bwak",
        bark_audio_size: 4,
        animate_list:[{
                name: "down",
                action: [0, 1, 2, 3, 4, 5, 6, 7]
            },{
                name: "left",
                action: [8, 9, 10, 11, 12, 13, 14, 15]
            },{
                name: "up",
                action: [16, 17, 18, 19, 20, 21, 22, 23]
            },{
                name: "right",
                action: [24, 25, 26, 27, 28, 29, 30, 31]
            }
        ],
        escapeMove: "chickenMove",
        escapeType: "escapeDijkstra"
    },
    golden_chicken:{
        picName: "golden_chicken",
        price: 80,
        speedMin: 5,
        speedMax: 9,
        bark_audio_name: "chicken_bwak",
        bark_audio_size: 4,
        animate_list:[{
                name: "down",
                action: [0, 1, 2, 3, 4, 5, 6, 7]
            },{
                name: "left",
                action: [8, 9, 10, 11, 12, 13, 14, 15]
            },{
                name: "up",
                action: [16, 17, 18, 19, 20, 21, 22, 23]
            },{
                name: "right",
                action: [24, 25, 26, 27, 28, 29, 30, 31]
            }
        ],
        escapeMove: "chickenMove",
        escapeType: "escapeDijkstra"
    },
    evil_chicken:{
        picName: "evil_chicken",
        price: 0,
        speedMin: 4,
        speedMax: 12,
        bark_audio_name: "chicken_bwak",
        bark_audio_size: 4,
        animate_list:[{
                name: "down",
                action: [0, 1, 2, 3, 4, 5, 6, 7]
            },{
                name: "left",
                action: [8, 9, 10, 11, 12, 13, 14, 15]
            },{
                name: "up",
                action: [16, 17, 18, 19, 20, 21, 22, 23]
            },{
                name: "right",
                action: [24, 25, 26, 27, 28, 29, 30, 31]
            }
        ],
        escapeMove: "chickenMove",
        escapeType: "escapeDijkstra"
    },
    cow:{
        picName: "cow",
        price: 30,
        speedMin: 2,
        speedMax: 4,
        damage: 3,
        bark_audio_name: "cow_moo",
        bark_audio_size: 3,
        animate_list:[{
                name: "down",
                action: [0, 1, 2, 3, 4, 5, 6, 7]
            },{
                name: "left",
                action: [8, 9, 10, 11, 12, 13, 14, 15]
            },{
                name: "up",
                action: [16, 17, 18, 19, 20, 21, 22, 23]
            },{
                name: "right",
                action: [24, 25, 26, 27, 28, 29, 30, 31]
            }
        ],
        escapeMove: "cowMove",
        escapeType: "escapeLine"
    },
    red_bull:{
        picName: "red_bull",
        price: 60,
        speedMin: 1,
        speedMax: 3,
        damage: 8,
        bark_audio_name: "cow_moo",
        bark_audio_size: 3,
        animate_list:[{
                name: "down",
                action: [0, 1, 2, 3, 4, 5, 6, 7]
            },{
                name: "left",
                action: [8, 9, 10, 11, 12, 13, 14, 15]
            },{
                name: "up",
                action: [16, 17, 18, 19, 20, 21, 22, 23]
            },{
                name: "right",
                action: [24, 25, 26, 27, 28, 29, 30, 31]
            }
        ],
        escapeMove: "cowMove",
        escapeType: "escapeLine"
    },
    escapeman:{
        picName: "escapeman",
        price: 0,
        speedMin: 6,
        speedMax: 13,
        bark_audio_name: "escapeman_sound",
        bark_audio_size: 4,
        animate_list:[{
                name: "down",
                action: [8, 9, 10, 11, 12, 13, 14, 15]
            },{
                name: "left",
                action: [0, 1, 2, 3, 4, 5, 6, 7]
            },{
                name: "up",
                action: [8, 9, 10, 11, 12, 13, 14, 15]
            },{
                name: "right",
                action: [8, 9, 10, 11, 12, 13, 14, 15]
            }
        ],
        escapeMove: "chickenMove",
        escapeType: "escapeDijkstra"
    }

};

function escapeDijkstra(object, dijkstraTerrain) {
    scaleSize = Phaser.Math.min(game.world.width / BOARD_COLS, game.world.height / BOARD_ROWS) / SQUARE_SIZE;
    posX = Phaser.Math.floor(object.x/scaleSize / SQUARE_SIZE) + 1;
    posY = Phaser.Math.floor(object.y/scaleSize / SQUARE_SIZE) + 1;
    cost = dijkstraTerrain[posX][posY];
    if (cost == 0)
        return {d:0};

    direct = [{"x":posX-1, "y":posY, "d":1}, 
              {"x":posX+1, "y":posY, "d":2}, 
              {"x":posX, "y":posY-1, "d":3}, 
              {"x":posX, "y":posY+1, "d":4}];

    for (var i = 0; i < direct.length; i++) {
        if (direct[i].x < 0 || direct[i].x >= dijkstraTerrain.length || direct[i].y < 0 || direct[i].y >= dijkstraTerrain[0].length) {
            direct.splice(i, 1);
            i--;
        }
    }

    for (var j = 1; j < direct.length; j++) {
        if (dijkstraTerrain[direct[0].x][direct[0].y] > dijkstraTerrain[direct[j].x][direct[j].y]) {
            temp = direct[0];
            direct[0] = direct[j];
            direct[j] = temp;
        }
    }

    if (direct.length == 0)
        return {d:0};
    else
        return direct[0];
}

function escapeLine(object, dijkstraTerrain) {
    scaleSize = Phaser.Math.min(game.world.width / BOARD_COLS, game.world.height / BOARD_ROWS) / SQUARE_SIZE;
    posX = Phaser.Math.floor(object.x/scaleSize / SQUARE_SIZE+0.5) + 1;
    posY = Phaser.Math.floor(object.y/scaleSize / SQUARE_SIZE+0.5) + 1;
    cost = dijkstraTerrain[posX][posY];
    if (cost == 0)
        return {d:0};

    var select_direct;
    if (object.cow_target == null) {
        direct = [{"x":posX-1, "y":posY, "d":1}, 
                  {"x":posX+1, "y":posY, "d":2}, 
                  {"x":posX, "y":posY-1, "d":3}, 
                  {"x":posX, "y":posY+1, "d":4}];
        select_direct = direct[game.rnd.integerInRange(0, 3)];
        object.cow_target = select_direct.d;
    } else {
        switch(object.cow_target) {
            case 1:
                select_direct = {"x":posX-1, "y":posY, "d":1};
                break;
            case 2:
                select_direct = {"x":posX+1, "y":posY, "d":2};
                break;
            case 3:
                select_direct = {"x":posX, "y":posY-1, "d":3};
                break;
            case 4:
                select_direct = {"x":posX, "y":posY+1, "d":4};
                break;
            default:
                return {d:0};
        };
    }
    
    if (dijkstraTerrain[select_direct.x][select_direct.y] == 999) {
        return {d:5, "x":select_direct.x, "y":select_direct.y, att:select_direct, damage:Enemy[object.modelName].damage};
    } else {
        return select_direct;
    }

}

