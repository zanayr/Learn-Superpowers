class PlayerBehavior extends Sup.Behavior {
    //  Player move method
    move ( x, y ) {
        let canMove : boolean;
        position.add( x, y );
        
        let map = Sup.getActor( 'Level' ).tileMapRenderer.getTileMap();
        let worldTile = map.getTileAt( Layers.World, position.x, position.y );
        let actorTile = map.getTileAt( Layers.Actors, position.x, position.y );
        
        if ( worldTile === Tiles.Floor || worldTile === Tiles.Target ) {
            canMove = true;
            if ( actorTile === Tiles.Crate || actorTile === Tiles.Packet ) {
                let nextWorldTile = map.getTileAt( Layers.World, position.x + x, position.y + y );
                let nextActorTile = map.getTileAt( Layers.Actors, position.x + x, position.y + y );
                if ( nextWorldTile === Tiles.Floor && nextActorTile === Tiles.Empty ) {
                    map.setTileAt( Layers.Actors, position.x, position.y, Tiles.Empty );
                    map.setTileAt( Layers.Actors, position.x + x, position.y + y, Tiles.Crate );
                } else if ( nextWorldTile === Tiles.Target && nextActorTile === Tiles.Empty ) {
                    map.setTileAt( Layers.Actors, position.x, position.y, Tiles.Empty );
                    map.setTileAt( Layers.Actors, position.x + x, position.y + y, Tiles.Packet );
                } else {
                    canMove = false;
                }
            }
        } else {
            canMove = false;
        }
        if ( canMove ) {            
            this.actor.setPosition( position.x, position.y );
            Game.check( map );
        } else {
            position.subtract( x, y );
        }
    }


    start () {
        this.actor.setPosition( position );
    }


    update () {
        if ( !win ) {
            if ( Sup.Input.wasKeyJustPressed( 'UP' ) ) {
                this.move( 0, 1 );
                this.actor.spriteRenderer.setAnimation( 'up' );
            } else if ( Sup.Input.wasKeyJustPressed( 'DOWN' ) ) {
                this.move( 0, -1 );
                this.actor.spriteRenderer.setAnimation( 'down' );
            } else if ( Sup.Input.wasKeyJustPressed( 'LEFT' ) ) {
                this.move( -1, 0 );
                this.actor.spriteRenderer.setAnimation( 'left' );
            } else if ( Sup.Input.wasKeyJustPressed( 'RIGHT' ) ) {
                this.move( 1, 0 );
                this.actor.spriteRenderer.setAnimation( 'right' );
            }
        }
    }
}

Sup.registerBehavior( PlayerBehavior );