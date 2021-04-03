class Mob extends Sprite {
    isOutSide;
    xMove;
    yMove;
    static EDGES = {
        top: -1,
        bottom: 1,
        right: 1,
        left: -1
    }
    speed;

    constructor(getTexture, spriteParams) {
        super(getTexture, spriteParams);
        this.xMove = (Math.random() * (Mob.EDGES.right - Mob.EDGES.left) + Mob.EDGES.left) / 100
        this.yMove = (Math.random() * (Mob.EDGES.bottom - Mob.EDGES.top) + Mob.EDGES.top) / 100
        this.speed = 1;
    }

    setParameters() {
        this.position[0] += this.xMove * this.speed;
        this.position[1] += this.yMove * this.speed;
    }

    draw() {
        if (this.loaded) {
            this.handleRandomMovement()
        }
        super.draw();
    }

    handleRandomMovement() {
        if (this.position[0] > Mob.EDGES.right || this.position[0] < Mob.EDGES.left) {
            this.xMove = -this.xMove;
            this.isOutSide = true
        } else if (this.position[1] > Mob.EDGES.bottom || this.position[1] < Mob.EDGES.top) {
            this.yMove = -this.yMove;
            this.isOutSide = true
        }
    }
}
