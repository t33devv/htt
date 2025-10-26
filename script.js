import { StorageHandler } from "./StorageHandler.js";
var storage;

var player = document.getElementById("player");
var target = document.getElementById("target");
var projectile = document.getElementById("projectile");
var etl = document.getElementById("easyTargetL");
var etr = document.getElementById("easyTargetR");
var mtl = document.getElementById("medTargetL");
var mtr = document.getElementById("medTargetR");
var htl = document.getElementById("hardTargetL");
var htr = document.getElementById("hardTargetR");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var healthBar = document.getElementById("healthBarColor");

var etlBool = false;
var etrBool = false;
var mtlBool = false;
var mtrBool = false;
var htlBool = false;
var htrBool = false;

var etlHit = false;
var etrHit = false;
var mtlHit = false;
var mtrHit = false;
var htlHit = false;
var htrHit = false;

var velX = 0;

var prevNum = 0;

var score = 0;
var highScore = 0;

var health = 3;

var projUsed = false;

var pastTime = 0;

var isDamaged = false;

var isGameOver = false;

var floored = 0;

function init() {
    storage = new StorageHandler;
    highScore = storage._hscore || 0;
    tick();
    setTimeout(moveTarget, 500);
}

function tick() {
    projectPlayer();
    checkHit();
    updateHealthBar();
    checkTargPos();
    resetTargBool();
    clearScreen();
    drawText();
    checkHealth();
    floored = Math.floor(highScore);
    if (floored != highScore) {
        storage._hscore = 0;
        highScore = 0;
    }
    if (score > highScore) {
        highScore = score;
        storage._hscore = highScore;
    }
    if (!isGameOver)
        setTimeout(tick, 16);
}

function resetGame() {
    isGameOver = false;
    window.location = "./popup.html";
}

function checkHealth() {
    if (health == 0) {
        gameOver();
    }
}

function gameOver() {
    etl.style.animation = "none";
    etr.style.animation = "none";
    mtl.style.animation = "none";
    mtr.style.animation = "none";
    htl.style.animation = "none";
    htr.style.animation = "none";
    healthBar.style.width = 0 + "px";
    isGameOver = true;
}

function drawText() {
    ctx.fillStyle = "black";
    ctx.font = "90px Arial";
    ctx.fillText(score, 168, 100);
    ctx.fillStyle= "black";
    ctx.font = "20px Verdana";
    ctx.fillText("High Score: " + highScore, 125, 130);
}

function clearScreen() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function resetTargBool() {
    var etlLeft = parseInt(window.getComputedStyle(etl).getPropertyValue("left"));
    var etrLeft = parseInt(window.getComputedStyle(etr).getPropertyValue("left"));
    var mtlLeft = parseInt(window.getComputedStyle(mtl).getPropertyValue("left"));
    var mtrLeft = parseInt(window.getComputedStyle(mtr).getPropertyValue("left"));
    var htlLeft = parseInt(window.getComputedStyle(htl).getPropertyValue("left"));
    var htrLeft = parseInt(window.getComputedStyle(htr).getPropertyValue("left"));
    var projLeft = parseInt(window.getComputedStyle(projectile).getPropertyValue("left"));
    var projTop = parseInt(window.getComputedStyle(projectile).getPropertyValue("top"));
    if (etlLeft > -50 && etlLeft < -10) etlHit = false;
    if (mtlLeft > -50 && mtlLeft < -10) mtlHit = false;
    if (htlLeft > -50 && htlLeft < -10) htlHit = false;
    if (etrLeft < 430 && etrLeft > 390) etrHit = false;
    if (mtrLeft < 430 && mtrLeft > 390) mtrHit = false;
    if (htrLeft < 430 && htrLeft > 390) htrHit = false;
}

function checkTargPos() {
    var etlLeft = parseInt(window.getComputedStyle(etl).getPropertyValue("left"));
    var etrLeft = parseInt(window.getComputedStyle(etr).getPropertyValue("left"));
    var mtlLeft = parseInt(window.getComputedStyle(mtl).getPropertyValue("left"));
    var mtrLeft = parseInt(window.getComputedStyle(mtr).getPropertyValue("left"));
    var htlLeft = parseInt(window.getComputedStyle(htl).getPropertyValue("left"));
    var htrLeft = parseInt(window.getComputedStyle(htr).getPropertyValue("left"));
    var projLeft = parseInt(window.getComputedStyle(projectile).getPropertyValue("left"));
    var projTop = parseInt(window.getComputedStyle(projectile).getPropertyValue("top"));
    if (!etlHit && etlLeft > 380) {
        damage();
    }
    if (!mtlHit && mtlLeft > 380) {
        damage();
    }
    if (!htlHit && htlLeft > 380) {
        damage();
    }
    if (!etrHit && etrLeft < 5) {
        damage();
    }
    if (!mtrHit && mtrLeft < 5) {
        damage();
    }
    if (!htrHit && htrLeft < 5) {
        damage();
    }
}

function damage() {
    if (!isDamaged) {
        isDamaged = true;
        health--;
        setTimeout(resetDamage, 600);
    }
}

function resetDamage() {
    isDamaged = false;
}

function updateHealthBar() {
    healthBar.style.width = 68.3 * health + "px";
}

function checkHit() {
    var etlLeft = parseInt(window.getComputedStyle(etl).getPropertyValue("left"));
    var etrLeft = parseInt(window.getComputedStyle(etr).getPropertyValue("left"));
    var mtlLeft = parseInt(window.getComputedStyle(mtl).getPropertyValue("left"));
    var mtrLeft = parseInt(window.getComputedStyle(mtr).getPropertyValue("left"));
    var htlLeft = parseInt(window.getComputedStyle(htl).getPropertyValue("left"));
    var htrLeft = parseInt(window.getComputedStyle(htr).getPropertyValue("left"));
    var projLeft = parseInt(window.getComputedStyle(projectile).getPropertyValue("left"));
    var projTop = parseInt(window.getComputedStyle(projectile).getPropertyValue("top"));
    if (etlBool) {
        if (projTop <= 0) {
            if (projLeft < (etlLeft + 45) && projLeft > (etlLeft)) {
                addScore(etlHit, etl);
                etlHit = true;
            }
        }
    }
    if (etrBool) {
        if (projTop <= 5) {
            if (projLeft < (etrLeft + 45) && projLeft > (etrLeft)) {
                addScore(etrHit, etr);
                etrHit = true;
            }
        }
    }
    if (mtlBool) {
        if (projTop <= 15) {
            if (projLeft < (mtlLeft + 30) && projLeft > (mtlLeft)) {
                addScore(mtlHit, mtl);
                mtlHit = true;
            }
        }
    }
    if(mtrBool) {
        if (projTop <= 15) {
            if (projLeft < (mtrLeft + 30) && projLeft > (mtrLeft)) {
                addScore(mtrHit, mtr);
                mtrHit = true;
            }
        }
    }
    if (htlBool) {
        if (projTop <= 15) {
            if (projLeft < (htlLeft + 20) && projLeft > (htlLeft)) {
                addScore();
                htlHit = true;
            }
        }
    }
    if (htrBool) {
        if (projTop <= 15) {
            if (projLeft < (htrLeft + 20) && projLeft > (htrLeft)) {
                addScore();
                htrHit = true;
            }
        }
    }
}

function addScore() {
    if (!projUsed) {
        projUsed = true;
        score++;
        setTimeout(resetProj, 250);
        console.log(score);
    }
}

function resetProj() {
    projUsed = false;
}

function animate(obj, anim, interval) {
    if (obj.classList == anim) return;
    obj.classList.add(anim);
    setTimeout(function() {
        obj.classList.remove(anim);
    }, interval);
}

function moveTarget() {
    var targNum = Math.floor(Math.random() * 5 + 1);
    if (prevNum == targNum) var targNum = Math.floor(Math.random() * 5 + 1);
    prevNum = targNum;
    targetSelect(targNum);
    setTimeout(moveTarget, 2000);
}

function timeoutEtl() {
    etlBool = true;
    setTimeout(function() {etlBool = false}, 5000);
}

function timeoutEtr() {
    etrBool = true;
    setTimeout(function() {etrBool = false}, 5000);
}

function timeoutMtl() {
    mtlBool = true;
    setTimeout(function() {mtlBool = false}, 3500);
}

function timeoutMtr() {
    mtrBool = true;
    setTimeout(function() {mtrBool = false}, 3500);
}

function timeoutHtl() {
    htlBool = true;
    setTimeout(function() {htlBool = false}, 2500);
}

function timeoutHtr() {
    htrBool = true;
    setTimeout(function() {htrBool = false}, 2500);
}

function targetSelect(num) {
    switch (num) {
        case 1:
            animate(etl, "etl", 5000);
            timeoutEtl();
            break;
        case 2:
            animate(etr, "etr", 5000);
            timeoutEtr();
            break;
        case 3:
            animate(mtl, "mtl", 3500);
            timeoutMtl();
            break;
        case 4:
            animate(mtr, "mtr", 3500);
            timeoutMtr();
            break;
        case 5:
            animate(htl, "htl", 2500);
            timeoutHtl();
            break;
        case 6:
            animate(htr, "htr", 2500);
            timeoutHtr();
            break;
    }
}

function projectPlayer() {
    projectile.style.left = parseInt(player.style.left) + 10 + "px";
    var pl = parseInt(window.getComputedStyle(player).getPropertyValue("left"));

    var left = parseInt(window.getComputedStyle(player).getPropertyValue("left"));

    if (velX == -1 && pl > 0) {
        player.style.left = left - 5 + "px";
    }
    if (velX == 1 && pl < 360) {
        player.style.left = left + 5 + "px";
    }
}

document.addEventListener("keydown", event => {
    if (isGameOver && (event.key == "ArrowLeft" || event.key == "a" || event.key == "ArrowRight" || event.key == "d" || event.key == "w" || event.key == " " || event.key == "ArrowUp" || event.key == "Enter")) {
        resetGame();
    }
    if (!isGameOver) {
        if (event.key == "ArrowLeft" || event.key == "a") {
            velX = -1;
        }
        if (event.key == "ArrowRight" || event.key == "d") {
           velX = 1;
        }
        if (event.key == "w" || event.key == " " || event.key == "ArrowUp") {
            animate(projectile, "project", 500);
        }
    }
});
document.addEventListener("keyup", event => {
    velX = 0;
});
document.addEventListener("click", event => {
    if (isGameOver)
        resetGame();
    if (!isGameOver)
        animate(projectile, "project", 500);
});

init();