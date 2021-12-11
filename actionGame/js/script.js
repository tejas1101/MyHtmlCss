score = 0
cross = true

audiogo = new Audio('../images/music.mp3')
audioover = new Audio('../images/gameover.mp3')

setTimeout(()=>{
    audiogo.play()
},100)

document.onkeydown = function (e) {
    console.log("key code is ", e.keyCode)
    if (e.keyCode == 38) {
        let dino = document.querySelector('.dino')
        dino.classList.add('animateDino')
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 1200)
    }

    else if (e.keyCode == 39) {
        let dino = document.querySelector('.dino')
        dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'))

        dino.style.left = dx + 100 + "px"

    }

    else if (e.keyCode == 37) {
        let dino = document.querySelector('.dino')
        dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'))

        dino.style.left = dx - 100 + "px"

    }
}

setInterval(() => {
    dino = document.querySelector('.dino')
    obstacle = document.querySelector('.obstacle')
    gameover = document.querySelector('.gameOver')

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'))
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'))

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'))
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'))

    offsetX = Math.abs(dx - ox)
    offsetY = Math.abs(dy - oy)

    if (offsetX < 100 && offsetY < 65) {
        gameover.innerHTML = 'Game Over - Reload to restart'
        audioover.play()
        audiogo.pause()
        setTimeout(() => {
            audioover.pause()
        }, 1000);
        obstacle.classList.remove('animateObstacle')
        dino.style.left = '40px';
    }

    else if (offsetX < 125 && cross) {
        score += 1;
        updateScore(score)
        cross = false
        setTimeout(() => {
            cross = true
        }, 1000)

        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'))
            newDur = aniDur - 0.2
            obstacle.style.animationDuration = newDur + 's'
        }, 600)
    }
}, 1)

function updateScore(score) {
    scoreCount = document.getElementById('scoreCount')
    scoreCount.innerHTML = `Your Score is: ${score}`;
}

score -= 1
updateScore(score)
