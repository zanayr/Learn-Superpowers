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
    //  Auxillary functions
    function checkVictory ( level, boxesNumber, boxesPositions, targetPositions ) {
        let posBox = new Sup.Math.Vector2;
        let posTarget = new Sup.Math.Vector2;
        let count : number = 0;

        for ( posBox of boxesPositions )
            for ( posTarget of targetPositions )
                if ( posBox.x === posTarget.x && posBox.y === posTarget.y )
                    count++;
        if ( count === boxesNumber )
            return true;
        return false;
    }
    //  Exported functions
    export function checkLevel ( level ) {
        let boxesNumber : number = 0;
        let boxesPositions = [];
        let targetPositions = [];

        for ( let column = 0; column < 12; column++ ) {
            for (let row = 0; row < 16; row++ ) {
                let actorTile = level.GetTileAt( Layers.Actors, row, column );
                let worldTile = level.GetTileAt( Layers.World, row, column );
                if (actorTile === Tiles.Crate || actorTile === Tiles.Packet) {
                    let position = new Sup.Math.Vector2( row, column );
                    boxesPositions.push( position );
                    boxesNumber++;
                }
                if ( worldTile === Tiles.Target ) {
                    let position = new Sup.Math.Vector2( row, column );
                    targetPositions.push( position );
                }
            }
        }

        if ( checkVictory( level, boxesNumber, boxesPositions, targetPositions ) ) {
            isLevelWon = true;
            levelCount++;
            Sup.log('DEBUG : VICTORY'); // temporary log
        }
    }
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