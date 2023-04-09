const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');

let isJumping = false;
let gravity = 0.9;
let dinoPosition = 0;

function jump() {
    if (!isJumping) {
        isJumping = true;
        let upInterval = setInterval(function() {
            if (dinoPosition >= 150) {
                clearInterval(upInterval);
                let downInterval = setInterval(function() {
                    if (dinoPosition <= 0) {
                        clearInterval(downInterval);
                        isJumping = false;
                    } else {
                        dinoPosition -= 5;
                        dino.style.bottom = dinoPosition + 'px';
                    }
                }, 20);
            } else {
                dinoPosition += 5;
                dino.style.bottom = dinoPosition + 'px';
            }
        }, 20);
    }
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        jump();
    }
});

function generateObstacle() {
    let obstaclePosition = 800;
    let randomTime = Math.random() * 2000;
    obstacle.style.right = obstaclePosition + 'px';
    let obstacleInterval = setInterval(function() {
        if (obstaclePosition < -20) {
            clearInterval(obstacleInterval);
            obstacle.remove();
        } else if (obstaclePosition > 0 && obstaclePosition < 60 && dinoPosition < 60) {
            clearInterval(obstacleInterval);
            document.body.innerHTML = '<h1>Game Over!</h1>';
        } else {
            obstaclePosition -= 10;
            obstacle.style.right = obstaclePosition + 'px';
        }
    }, 20);
    setTimeout(generateObstacle, randomTime);
}

generateObstacle();
