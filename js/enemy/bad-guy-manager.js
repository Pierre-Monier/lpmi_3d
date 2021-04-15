class BadGuyManager {
    badGuys;
    areSlowed;

    constructor() {
        this.badGuys = [];
        this.areSlowed = false;
        // setInterval(() => { this.generateBadGuy() }, 1000);
        this.generateBadGuy()
    }

    generateBadGuy() {
        const enemy = this.getEnemy();

        if (enemy) {
            enemy.sprite.position = [this.getFirstXPosition(), Math.random(), 0];
            if (this.areSlowed) {
                enemy.sprite.speed = 0.3;
            }
            this.badGuys.push(enemy);
        }

        setTimeout(() => {
            this.generateBadGuy();
        }, this.getEnemyGenerationDelay())
    }

    getFirstXPosition() {
        const x = Math.random();
        if (x < 0.5) {
            return x - 3;
        }

        return x + 2;
    }

    getEnemyGenerationDelay() {
        switch (hero.state) {
            case 1:
                return 3000;
            case 2:
                return 2500;
            case 3:
                return 2000;
            default:
                break;
        }
    }

    getEnemy() {
        const x = this.getRandomNumber()
        switch (true) {
            case x <= 33:
                return new Shark()
            case x <= 66:
                return new Shark()
            case x <= 75:
                return new Blobfish()
            case x <= 100:
                return new NaziShark()
            default:
                break;
        }
    }

    slowEnemies() {
        this.badGuys.forEach((badGuy) => {
            badGuy.sprite.speed = 0.3;
            badGuy.isSlowed = true;
        });
        this.areSlowed = true;

        setTimeout(() => {
            this.badGuys.forEach((badGuy) => {
                badGuy.sprite.speed = 1;
                badGuy.isSlowed = false;
            });
            this.areSlowed = false;
        }, Bonus.slowBonusDuration)
    }

    getRandomNumber() {
        switch (hero.state) {
            case 1:
                return Math.random() * (50 - 1) + 1
            case 2:
                return Math.random() * (70 - 1) + 1
            case 3:
                return Math.random() * (100 - 1) + 1
            default:
                break;
        }
    }
}