function draw() {
    // initialisation du viewport
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

    // efface les buffers de couleur et de profondeur
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // dessin du vaisseau
    gl.useProgram(hero.model.shader());
    hero.model.sendUniformVariables();
    hero.model.draw();

    // charge le shader des sprites
    gl.useProgram(Sprite.shader);

    // dessin du mob,
    badGuyGenerator.badGuys.forEach((badGuy, index) => {
        if (badGuy.life > 0) {
            badGuy.sprite.sendUniformVariables();
            badGuy.sprite.draw();
        } else {
            hero.addPoints(badGuy.points);
            badGuy.sprite.clear();
            badGuyGenerator.badGuys.splice(index, 1);
        }

    });

    // dessin de la vie
    hero.lives.forEach((life) => {
        life.sendUniformVariables();
        life.draw();
    })

    // test pour afficher un splat quand on appuie sur espace
    hero.shoots.forEach((rocket, index) => {
        if (rocket.isOutSide) {
            rocket.clear();
            hero.shoots.splice(index, 1);
        } else {
            rocket.sendUniformVariables();
            rocket.draw();
        }
    })

    checkCollision();

    bgParallax.draw();
}

// animation
let lastTime = 0;
function animate() {
    // fonction appel�e � chaque frame, permet d'animer la sc�ne
    const timeNow = new Date().getTime();
    if (lastTime !== 0) {
        // anime chacun des objets de la scene
        // si necessaire (en fonction du temps ecoul�)
        const elapsed = timeNow - lastTime;
        hero.model.setParameters(elapsed);
        background.setParameters(elapsed);
        hero.shoots.forEach((rocket) => rocket.setParameters(elapsed));
    }

    lastTime = timeNow;
}

function checkCollision() {
    hero.shoots.forEach((shoot) => {
        badGuyGenerator.badGuys.forEach((badGuy) => {
            if (shoot.collision(badGuy.sprite)) {
                badGuy.life -= 1;
            }
        })
    })

    // badGuyGenerator.badGuys.forEach((badGuy) => {
        // if (badGuy.sprite.collision(hero.model)) {
        //     hero.life -= 1;
        //     console.log('BadGuy collision with Hero')
        // }
    // })
}


function tick() {
    if (hero.getLives() > 0) {
        requestAnimFrame(tick);
        handleKeys();
        draw();
        animate();
    } else {
        endGame();
    }
}