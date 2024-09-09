// 创建画布
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 定义游戏区域的大小
const canvasWidth = 400;
const canvasHeight = 400;

// 定义蛇的初始位置和大小
let snakeX = 200;
let snakeY = 200;
let snakeSize = 20;
// 定义蛇的移动速度
let snakeSpeedX = 5;
let snakeSpeedY = 5;


// 定义食物的位置和大小
let foodX = 100;
let foodY = 100;
let foodSize = 20;

// 监听键盘按键事件，控制蛇的移动方向
document.addEventListener("keydown", changeDirection);

// 更新游戏状态
function update() {
    // 清空画布
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // 更新蛇的位置
    snakeX += snakeSpeedX;
    snakeY += snakeSpeedY;

    // 绘制蛇的身体
    ctx.fillStyle = "green";
    ctx.fillRect(snakeX, snakeY, snakeSize, snakeSize);

    // 绘制食物
    ctx.fillStyle = "red";
    ctx.fillRect(foodX, foodY, foodSize, foodSize);

    // 检测蛇是否吃到食物
    if (snakeX === foodX && snakeY === foodY) {
        // 食物被吃掉后，重新生成食物的位置
        foodX = Math.floor(Math.random() * canvasWidth);
        foodY = Math.floor(Math.random() * canvasHeight);
    }

    // 检测蛇是否撞墙
    if (
        snakeX < 0 ||
        snakeX >= canvasWidth ||
        snakeY < 0 ||
        snakeY >= canvasHeight
    ) {
        // 游戏结束
        alert("Game Over");
        // 重置游戏状态
        snakeX = 200;
        snakeY = 200;
        snakeSpeedX = 0;
        snakeSpeedY = 0;
    }

    // 循环更新游戏状态
    requestAnimationFrame(update);
}

// 改变蛇的移动方向
function changeDirection(event) {
    const keyPressed = event.keyCode;
    if (keyPressed === 37 && snakeSpeedX !== 20) {
        // 左箭头键
        snakeSpeedX = -20;
        snakeSpeedY = 0;
    } else if (keyPressed === 38 && snakeSpeedY !== 20) {
        // 上箭头键
        snakeSpeedX = 0;
        snakeSpeedY = -20;
    } else if (keyPressed === 39 && snakeSpeedX !== -20) {
        // 右箭头键
        snakeSpeedX = 20;
        snakeSpeedY = 0;
    } else if (keyPressed === 40 && snakeSpeedY !== -20) {
        // 下箭头键
        snakeSpeedX = 0;
        snakeSpeedY = 20;
    }
}

// 启动游戏
update();