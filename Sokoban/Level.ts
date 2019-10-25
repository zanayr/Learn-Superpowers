class LevelBehavior extends Sup.Behavior {
    level = this.actor.tileMapRenderer;

    awake () {
        this.level.setTileMap('Levels/' + LEVELS[levelCount]);
        Game.getPosition(this.level.getTileMap());
    }

    update () {

    }
}

Sup.registerBehavior(LevelBehavior);