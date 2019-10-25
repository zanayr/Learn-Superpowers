class PlayerBehavior extends Sup.Behavior {
    level = this.actor.tileMapRenderer;

    //  Player move method
    move ( x, y ) {
        let canMove : boolean;
        playerPosition.add( x, y );
        
        let level = Sup.getActor( 'Level' ).tileMapRenderer.getTileMap();
        let worldTile = level.getTileAt( Layers.World, playerPosition.x, playerPosition.y );
        let actorTile = level.getTileAt( Layers.Actors, playerPosition.x, playerPosition.y );

        if ( worldTile === Tiles.Floor || worldTile === Tiles.Target ) {
            canMove = true;
            if ( actorTile === Tiles.Crate || actorTile === Tiles.Packet ) {
                let nextWorldTile = level.getTileAt( Layers.World, playerPosition.x + x, playerPosition.y + y );
                let nextActorTile = level.getTileAt( Layers.Actors, playerPosition.x + x, playerPosition.y + y );
                if ( nextWorldTile === Tiles.Floor && nextActorTile === Tiles.Empty ) {
                    level.setTileAt( Layers.Actors, playerPosition.x, playerPosition.y, Tiles.Empty );
                    level.setTileAt( Layers.Actors, playerPosition.x + x, playerPosition.y + y, Tiles.Crate );
                } else if ( nextWorldTile === Tiles.Target && nextActorTile === Tiles.Empty ) {
                    level.setTileAt( Layers.Actors, playerPosition.x, playerPosition.y, Tiles.Empty );
                    level.setTileAt( Layers.Actors, playerPosition.x + x, playerPosition.y + y, Tiles.Packet );
                } else {
                    canMove = false;
                }
            }
        } else {
            canMove = false;
        }
        if ( canMove ) {
            this.actor.setPosition( playerPosition.x, playerPosition.y );
        } else {
            playerPosition.subtract( x, y );
        }
    }


    start () {
        this.actor.setPosition(playerPosition);
    }


    update () {
        if ( !isLevelWon ) {
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

Sup.registerBehavior(PlayerBehavior);