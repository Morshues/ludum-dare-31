var Level = [{
        label:"LEVEL 1",
        terrain:[[0,0,0,0,0,0,0,0,0,0],
                 [0,1,1,1,1,1,1,1,1,0],
                 [0,1,0,0,0,0,0,0,1,0],
                 [0,1,0,1,1,1,1,0,1,0],
                 [0,1,0,1,0,0,1,0,1,0],
                 [0,1,0,0,0,0,1,0,1,0],
                 [0,1,1,1,1,1,1,0,1,0],
                 [0,0,0,0,0,0,0,0,1,0],
                 [0,1,1,1,1,1,1,1,1,0],
                 [0,0,0,0,0,0,0,0,0,0]],
        enemyType: {chicken:1},
        enemyNum: 20,
        enemy_edge:{left:0.4, right:0.6},
        time: 30,
        rewards: 500,
        guidelineList: [{t:"PLEASE PICK THEM BACK", s:42}, {t:"LEVEL 1", s:72}],
        stayGuide: "        PLEASE\nPICK THEM BACK"
    },{
        label:"LEVEL 2",
        terrain:[[0,0,0,0,0,0,0,0,0,0],
                 [0,1,1,1,1,1,1,1,1,0],
                 [0,1,0,0,0,0,0,0,1,0],
                 [0,1,0,1,1,1,1,0,1,0],
                 [0,1,0,1,0,0,1,0,1,0],
                 [0,1,0,0,0,0,1,0,1,0],
                 [0,1,1,1,1,1,1,0,1,0],
                 [0,0,0,0,0,0,0,0,1,0],
                 [0,1,1,1,1,1,1,1,1,0],
                 [0,0,0,0,0,0,0,0,0,0]],
        enemyType: {chicken:0.96, escapeman:0.04},
        enemyNum: 30,
        enemy_edge:{left:0.4, right:0.6},
        time: 60,
        rewards: 1000,
        guidelineList: [{t:"PICK ESCAPEMAN WILL GET $100", s:36}, {t:"LEVEL 2", s:72}],
        stayGuide: "PICK ESCAPEMAN\n  WILL GET $100"

    },{
        label:"LEVEL 3",
        terrain:[[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                 [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
                 [0,1,0,0,0,0,0,0,0,0,0,0,1,0],
                 [0,1,0,1,1,1,1,1,1,1,1,0,1,0],
                 [0,1,0,1,0,0,0,0,0,0,1,0,1,0],
                 [0,1,0,1,0,1,1,1,1,0,1,0,1,0],
                 [0,1,0,1,0,1,0,0,1,0,1,0,1,0],
                 [0,1,0,1,0,1,0,0,1,0,1,0,1,0],
                 [0,1,0,1,0,1,0,1,1,0,1,0,1,0],
                 [0,1,0,1,0,1,0,0,0,0,1,0,1,0],
                 [0,1,0,1,0,1,1,1,1,1,1,0,1,0],
                 [0,1,0,1,0,0,0,0,0,0,0,0,1,0],
                 [0,1,0,1,1,1,1,1,1,1,1,1,1,0],
                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
        enemyType: {chicken:0.94, cow:0.03, escapeman:0.03},
        enemyNum: 40,
        enemy_edge:{left:0.4, right:0.6},
        time: 40,
        rewards: 1500,
        guidelineList: [{t:"COWS WILL DESTROY THE FENCE", s:36}, {t:"LEVEL 3", s:72}],
        stayGuide: "        COWS WILL\nDESTROY THE FENCE"
    },{
        label:"LEVEL 4",
        terrain:[[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                 [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
                 [0,1,0,0,0,0,0,0,0,0,0,0,1,0],
                 [0,1,0,1,1,1,1,1,1,1,1,0,1,0],
                 [0,1,0,1,0,0,0,0,0,0,1,0,1,0],
                 [0,1,0,1,0,1,1,1,1,0,1,0,1,0],
                 [0,1,0,1,0,1,0,0,1,0,1,0,1,0],
                 [0,1,0,1,0,1,0,0,1,0,1,0,1,0],
                 [0,1,0,1,0,1,0,1,1,0,1,0,1,0],
                 [0,1,0,1,0,1,0,0,0,0,1,0,1,0],
                 [0,1,0,1,0,1,1,1,1,1,1,0,1,0],
                 [0,1,0,1,0,0,0,0,0,0,0,0,1,0],
                 [0,1,0,1,1,1,1,1,1,1,1,1,1,0],
                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
        enemyType: {chicken:0.86, cow:0.1, escapeman:0.03, golden_chicken:0.01},
        enemyNum: 50,
        enemy_edge:{left:0.4, right:0.6},
        time: 60,
        rewards: 2500,
        guidelineList: [{t:"GOLDEN CHICKEN RUN FASTER AND MORE EXPENSIVE", s:22}, {t:"LEVEL 4", s:72}],
        stayGuide: "    GOLDEN CHICKEN\n        RUN FASTER\nAND MORE EXPENSIVE"
    },{
        label:"LEVEL 5",
        terrain:[[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                 [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
                 [0,1,0,0,0,0,0,0,0,0,0,0,1,0],
                 [0,1,0,1,1,1,1,1,1,1,1,0,1,0],
                 [0,1,0,1,0,0,0,0,0,0,1,0,1,0],
                 [0,1,0,1,0,1,1,1,1,0,1,0,1,0],
                 [0,1,0,1,0,1,0,0,1,0,1,0,1,0],
                 [0,1,0,1,0,1,0,0,1,0,1,0,1,0],
                 [0,1,0,1,0,1,0,1,1,0,1,0,1,0],
                 [0,1,0,1,0,1,0,0,0,0,1,0,1,0],
                 [0,1,0,1,0,1,1,1,1,1,1,0,1,0],
                 [0,1,0,1,0,0,0,0,0,0,0,0,1,0],
                 [0,1,0,1,1,1,1,1,1,1,1,1,1,0],
                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
        enemyType: {chicken:0.84, cow:0.09, escapeman:0.03, golden_chicken:0.01, red_bull:0.03},
        enemyNum: 60,
        enemy_edge:{left:0.4, right:0.6},
        time: 60,
        rewards: 4000,
        guidelineList: [{t:"RED BULL DESTROY FENCE FASTER", s:36}, {t:"LEVEL 5", s:72}],
        stayGuide: "    RED BULL\n    DESTROY\nFENCE FASTER"
    },{
        label:"LEVEL 6",
        terrain:[[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                 [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
                 [0,1,0,0,0,0,0,0,0,0,0,0,1,0],
                 [0,1,0,1,1,1,1,1,1,1,1,0,1,0],
                 [0,1,0,1,0,0,0,0,0,0,1,0,1,0],
                 [0,1,0,1,0,1,1,1,1,0,1,0,1,0],
                 [0,1,0,1,0,1,0,0,1,0,1,0,1,0],
                 [0,1,0,1,0,1,0,0,1,0,1,0,1,0],
                 [0,1,0,1,0,1,0,1,1,0,1,0,1,0],
                 [0,1,0,1,0,1,0,0,0,0,1,0,1,0],
                 [0,1,0,1,0,1,1,1,1,1,1,0,1,0],
                 [0,1,0,1,0,0,0,0,0,0,0,0,1,0],
                 [0,1,0,1,1,1,1,1,1,1,1,1,1,0],
                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
        enemyType: {chicken:0.75, cow:0.1, escapeman:0.03, golden_chicken:0.03, red_bull:0.04, evil_chicken:0.05},
        enemyNum: 70,
        enemy_edge:{left:0.4, right:0.6},
        time: 60,
        rewards: 6000,
        guidelineList: [{t:"EVIL CHICKEN WILL INTERFERENCE YOU", s:28}, {t:"LEVEL 6", s:72}],
        stayGuide: "     EVIL CHICKEN\n             WILL\nINTERFERENCE YOU"
    },{
        label:"LEVEL 7",
        terrain:[[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                 [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
                 [0,1,0,0,0,0,0,0,0,0,0,0,1,0],
                 [0,1,0,1,1,1,1,1,1,1,1,0,1,0],
                 [0,1,0,1,0,0,0,0,0,0,1,0,1,0],
                 [0,1,0,1,0,1,1,1,1,0,1,0,1,0],
                 [0,1,0,1,0,1,0,0,1,0,1,0,1,0],
                 [0,1,0,1,0,1,0,0,1,0,1,0,1,0],
                 [0,1,0,1,0,1,0,1,1,0,1,0,1,0],
                 [0,1,0,1,0,1,0,0,0,0,1,0,1,0],
                 [0,1,0,1,0,1,1,1,1,1,1,0,1,0],
                 [0,1,0,1,0,0,0,0,0,0,0,0,1,0],
                 [0,1,0,1,1,1,1,1,1,1,1,1,1,0],
                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
        enemyType: {chicken:0.4, cow:0.3, escapeman:0.03, golden_chicken:0.03, red_bull:0.14, evil_chicken:0.1},
        enemyNum: 100,
        enemy_edge:{left:0.4, right:0.6},
        time: 60,
        rewards: 6000,
        guidelineList: [{t:"EVERYTHING ARE ALL CRAZY", s:40}, {t:"LEVEL 7", s:72}],
        stayGuide: "VERYTHING ARE\n     ALL CRAZY"
    }


];


    // terrain = [[0,0,0,0,0,0,0,0,0,0],
    //            [0,1,1,1,1,1,1,0,1,0],
    //            [0,1,0,0,0,0,0,0,1,0],
    //            [0,1,0,0,0,0,1,1,0,0],
    //            [0,1,0,0,0,0,0,0,0,0],
    //            [0,1,0,0,0,0,0,0,1,0],
    //            [0,0,0,0,0,0,0,0,1,0],
    //            [0,1,0,0,0,0,0,0,1,0],
    //            [0,1,1,1,1,1,1,1,1,0],
    //            [0,0,0,0,0,0,0,0,0,0]];

    // terrain = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    //            [0,1,1,1,1,1,1,1,1,1,1,0,1,0],
    //            [0,1,0,0,0,0,0,1,1,0,0,0,1,0],
    //            [0,1,0,0,1,0,0,1,0,0,1,1,0,0],
    //            [0,1,0,0,1,1,0,0,1,0,0,0,0,0],
    //            [0,1,0,0,1,0,0,0,0,0,0,0,1,0],
    //            [0,1,0,0,1,0,0,0,0,0,0,0,1,0],
    //            [0,1,0,0,1,0,0,0,0,0,0,0,1,0],
    //            [0,1,0,0,1,0,0,0,0,0,0,0,1,0],
    //            [0,1,0,0,1,0,0,0,0,0,0,0,1,0],
    //            [0,0,0,0,0,1,1,1,0,0,0,0,1,0],
    //            [0,1,0,1,0,0,0,0,0,0,0,0,1,0],
    //            [0,1,1,1,0,1,1,1,1,1,1,1,1,0],
    //            [0,0,0,0,0,0,0,0,0,0,0,0,0,0]];