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
var win : boolean = false;
var level : number = 1;
var max : number;
var saved : number[][];
var position = new Sup.Math.Vector2( 0, 0 );

//  Game namespace
namespace Game {
    //  Auxillary functions
    function victory ( count, crates, targets ) {
        let n : number = 0;
        for ( let crate of crates )
            for ( let target of targets )
                if ( crate.x === target.x && crate.y === target.y )
                    n++;
        if ( count === n )
            return true;
        return false;
    }
    //  Exported functions
    export function build () {
        win = false;
        Sup.loadScene( 'Game' );
    }
    export function check ( map ) {
        let count : number = 0;
        let crates = [];
        let targets = [];
        
        for ( let row = 0; row < 12; row++ ) {
            for (let column = 0; column < 16; column++ ) {
                let actorTile = map.getTileAt( Layers.Actors, column, row );
                let worldTile = map.getTileAt( Layers.World, column, row );
                if ( actorTile === Tiles.Crate || actorTile === Tiles.Packet ) {
                    crates.push( new Sup.Math.Vector2( column, row ) );
                    count++;
                }
                if ( worldTile === Tiles.Target )
                    targets.push( new Sup.Math.Vector2( column, row ) );
            }
        }

        if ( victory( count, crates, targets ) ) {
            win = true;
            level++;
        }
    }
    export function getPosition ( map ) {
        saved = [];
        position.x = 0;
        position.y = 0;
        
        for ( let row = 0; row < 12; row++ ) {
            for ( let column = 0; column < 16; column++ ) {
                let actorTile = map.getTileAt( Layers.Actors, column, row );
                saved.push( actorTile );
                if ( actorTile === Tiles.Start ) {
                    map.setTileAt( Layers.Actors, column, row, Tiles.Empty );
                    position.add( column, row );
                }
            }
        }
    }
    export function init () {
        max = Object.keys(LEVELS).length;
    }
    export function reset ( map ) {
        let index : number = 0;
        for ( let row = 0; row < 12; row++ ) {
            for (let column = 0; column < 16; column++ ) {
                map.setTileAt( Layers.Actors, column, row, saved[ index ] );
                index++;
            }
        }
        build();
    }
}


//  Initialize game
Game.init();