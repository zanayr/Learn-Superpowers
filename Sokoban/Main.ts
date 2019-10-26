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
    //  Local functions
    function victory ( total, crates, targets ) {
        /*  Should iterate through array of crate positions, checking them against an
            array of target positions, if they match, add one to count. If count is the same as
            total, then return ture.  */
        let count : number = 0;
        for ( let crate of crates )
            for ( let target of targets )
                if ( crate.x === target.x && crate.y === target.y )
                    count++;
        if ( total === count )
            return true;
        return false;
    }

    //  Exported functions
    export function build () {
        /*  Should set win to false and load the game scene  */
        win = false;
        Sup.loadScene( 'Game' );
    }
    export function check ( map ) {
        /*  Should iterate through all rows and columns of a tile map, pushing all
            crate and packet tiles on the Actors layer to arrays and checking if the
            level is complete.
            
            !! IMPORTANT:  Remember a row is the y value, and column is the x value  */
        let total : number = 0;
        let crates = [];
        let targets = [];
        for ( let row = 0; row < 12; row++ ) {
            for (let column = 0; column < 16; column++ ) {
                let actorTile = map.getTileAt( Layers.Actors, column, row );
                let worldTile = map.getTileAt( Layers.World, column, row );
                if ( actorTile === Tiles.Crate || actorTile === Tiles.Packet ) {
                    crates.push( new Sup.Math.Vector2( column, row ) );
                    total++;
                }
                if ( worldTile === Tiles.Target )
                    targets.push( new Sup.Math.Vector2( column, row ) );
            }
        }
        if ( victory( total, crates, targets ) ) {
            win = true;
            level++;
        }
    }
    export function locate ( map ) {
        /*  Should first clear the last saved array and set the player's position to
            the default value of (0, 0), then iterate through a tile map's rows and
            columns, first pushing every tile from the Actors layer into the saved
            array, in case the player resets the level, then search for the start tile,
            replacing it with an empty tile and placing the player's character at that
            location.
            
            !! IMPORTANT:  Remember a row is the y value, and column is the x value  */
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
        /*  Should get the max number of available levels  */
        max = Object.keys(LEVELS).length;
    }
    export function reset ( map ) {
        /*  Should iterate through all rows and columns of a passed tile map, setting
            the tile to the tile value in the saved array  */
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