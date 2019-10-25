//  Global constants
const LEVELS = {
    0: 'LevelTemplate',
    1: 'Level1',
    2: 'Level2',
    3: 'Level3'
};
//  Global enums
enum Layers {
    World = 0,
    Actors = 1
};
enum Tiles {
    Empty = -1,
    Wall = 0,
    Floor = 1,
    Target = 2,
    Crate = 3,
    Start = 4,
    Packet = 5
};
//  Global variables
var isLevelWon : boolean = false;
var levelCount : number = 1;
var levelMax : number;
var playerPosition = new Sup.Math.Vector2( 0, 0 );

//  Game namespace
namespace Game {
    //  Exported functions
    export function getMaxLevel () {
        levelMax = 0;
        for (let level in LEVELS)
            levelMax++;
    }
    export function getPosition (level) {
        playerPosition.x = 0;
        playerPosition.y = 0;
        for (let row = 0; row < 12; row++) {
            for (let column = 0; column < 16; column++) {
                let actorTile = level.getTileAt(Layers.Actors, column, row);
                if (actorTile === Tiles.Start) {
                    level.setTileAt(Layers.Actors, column, row, Tiles.Empty);
                    playerPosition.add(column, row);
                }
            }
        }
    }
}


//  Initialize game
Game.getMaxLevel();