class LevelBehavior extends Sup.Behavior {
    level = this.actor.tileMapRenderer;

    awake () {
        this.level.setTileMap( 'Levels/' + LEVELS[ levelCount ] );
        Game.getPosition( this.level.getTileMap() );
    }

    update () {
        if ( isLevelWon ) {
            if ( levelCount === levelMax ) {
                Sup.loadScene( 'Victory/Scene' );
            } else {
                this.actor.getChild( 'Next' ).setVisible( true );
                this.actor.getChild( 'Reset' ).setVisible( false );
            }

            if ( Sup.Input.wasKeyJustPressed( 'SPACE' ) ) {
                this.actor.getChild( 'Next' ).setVisible( false );
                this.actor.getChild( 'Reset' ).setVisible( true );

                this.level.setTileMap( 'Levels/' + LEVELS[ levelCount ] );

                Game.setLevel();
            }
        }

        if ( Sup.Input.wasKeyJustPressed( 'R' ) && !isLevelWon ) {
            Game.resetLevel( this.level.getTileMap() );
        }
    }
}

Sup.registerBehavior( LevelBehavior );