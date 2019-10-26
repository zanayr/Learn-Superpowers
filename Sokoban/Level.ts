class LevelBehavior extends Sup.Behavior {
    map = this.actor.tileMapRenderer;

    awake () {
        this.map.setTileMap( 'Levels/' + LEVELS[ level ] );
        Game.locate( this.map.getTileMap() );
    }

    update () {
        if ( win ) {
            if ( level === max ) {
                Sup.loadScene( 'Victory/Scene' );
            } else {
                this.actor.getChild( 'Next' ).setVisible( true );
                this.actor.getChild( 'Reset' ).setVisible( false );
            }

            if ( Sup.Input.wasKeyJustPressed( 'SPACE' ) ) {
                this.actor.getChild( 'Next' ).setVisible( false );
                this.actor.getChild( 'Reset' ).setVisible( true );

                this.map.setTileMap( 'Levels/' + LEVELS[ level ] );

                Game.build();
            }
        }

        if ( Sup.Input.wasKeyJustPressed( 'R' ) && !win ) {
            Game.reset( this.map.getTileMap() );
        }
    }
}

Sup.registerBehavior( LevelBehavior );