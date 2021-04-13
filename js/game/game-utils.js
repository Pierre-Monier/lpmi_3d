// les fonctions utiles pour charger des shaders et des textures

var gl; // les fonctionnalités OpenGL
var mvMatrix; // modelviewmatrix
var pMatrix; // projection matrix

// initialisation du contexte OpenGL
function initGL(canvas) {
    try {
        gl = canvas.getContext("webgl2");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    } catch (e) {
    }
    if (!gl) {
        alert("Could not initialise WebGL, sorry :-(");
    }
}

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

// charge et compile les shaders
function getShader(gl, id) {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }

    var str = "";
    var k = shaderScript.firstChild;
    while (k) {
        if (k.nodeType == 3) {
            str += k.textContent;
        }
        k = k.nextSibling;
    }

    var shader;
    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}


function initShaders(vsId, fsId) {
    // recupere les vertex et fragment shaders 
    var fragmentShader = getShader(gl, fsId);
    var vertexShader = getShader(gl, vsId);

    // cree le programme et lui associe les vertex/fragments
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    return shaderProgram;
}


function handleLoadedTexture(texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    // consome plein de ressource, à éviter
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    // La texture est maintenant chargé par la carte graphique
    gl.bindTexture(gl.TEXTURE_2D, null);
}


function initTexture(filename) {
    const texture = gl.createTexture();
    texture.image = new Image();
    texture.isLoaded = false;

    texture.image.onload = function () {
        handleLoadedTexture(texture)
        texture.width = this.width;
        texture.height = this.height;

        texture.isLoaded = true;
    }

    texture.image.src = filename;
    return texture;
}

mvMatrix = mat4.create();
const mvMatrixStack = [];
pMatrix = mat4.create();

function mvPushMatrix() {
    var copy = mat4.create();
    mat4.set(mvMatrix, copy);
    mvMatrixStack.push(copy);
}



function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getSplatTexture() {
    return initTexture('./models/Bonus/Spnning-Orb/Blue/frame-1.png')
}

function getMobTexture() {
    return initTexture('./models/planes/plane_1/plane_1_blue.png')
}

function getLifeTexture() {
    return initTexture('./models/lives/heart-pixel-art.png')
}

function getBG0Texture() {
    return initTexture('./textures/underwater-fantasy-files/PNG/layers/far.png')
}

function getBG1Texture() {
    return initTexture('./textures/underwater-fantasy-files/PNG/layers/sand.png')
}

function getBG2Texture() {
    return initTexture('./textures/underwater-fantasy-files/PNG/layers/foreground-merged.png')
}

function getSlowEnemyBonusTexture() {
    return initTexture('./models/Bonus/slowBonus.png')
}

function getInvincibleBonusTexure() {
    return initTexture('./models/Bonus/shieldBonus.png')
}

function getKillEnemyBonusTexture() {
    return initTexture('./models/Bonus/gunBonus.png')
}

function getBubbleBonusTextures() {
    return initTexture('./models/Bonus/bubble.png')   
}

function getHeroModel() {
    return './models/fish_exported/BlueGoldfish.obj';
}

