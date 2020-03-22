interface PongGameSettings {
  paddleRadius: number,
};

enum STATUS {
  INTRO,
  PLAYING_GAME,
  WIN_SCREEN
}

interface PongGameState {
  activeScreen: STATUS,
  score: number[],
  paddles: number[],
  ball: {
    x: number,
    y: number,
    heading: number,
    velocity: number
  }
};
let field;

let gameSettings: PongGameSettings = {
  paddleRadius: 1
};

let gameState: PongGameState;

let matrix: any;

function resetBall() {
  gameState.ball = {
    x: (Math.floor(matrix.width()/2)),
    y: (Math.floor(matrix.height()/2)),
    heading: 0.75, // (Math.random() * 0.25) + 0.125 + Math.random() < 0.5 ? 0 : 0.5,   // A random value within 45º of straight, randomly left or right.
    velocity: 32, // in pixels per second
  }
}

function resetGameState() {
  gameState = {
    activeScreen: STATUS.PLAYING_GAME,
    score: [0, 0],
    paddles:[Math.floor(matrix.height()/2), Math.floor(matrix.height()/2)],
    ball: {
      x: (Math.floor(matrix.width()/2)),
      y: (Math.floor(matrix.height()/2)),
      heading: 0.75, // (Math.random() * 0.25) + 0.125 + Math.random() < 0.5 ? 0 : 0.5,   // A random value within 45º of straight, randomly left or right.
      velocity: 32, // in pixels per second
    },
  }
}

function incrementScore(player: number){
  gameState.score[player]++;
  if (gameState.score[player] >= 10) {
    gameState.activeScreen = STATUS.WIN_SCREEN;
    setTimeout(resetGameState, 2000);
    setTimeout(tick, 3000);
  } else {
    resetBall();
    setTimeout(tick, 2000);
  }
}

function tick() {
  let ball = gameState.ball;
  // Move ball
  ball.x += Math.sin(Math.PI*ball.heading*2);
  ball.y += Math.cos(Math.PI*ball.heading*2);
  // Hitting edges? Apply reflection
  if (ball.y < 0){
    ball.y = 0 - ball.x;
    ball.heading < 0.5 ? ball.heading = 0.5 - ball.heading : ball.heading = 1.5 - ball.heading;
  };
  if (ball.y >= matrix.height()){
    ball.y = matrix.height - (ball.y - matrix.height);
    ball.heading < 0.5 ? ball.heading = 0.5 - ball.heading : ball.heading = 1.5 - ball.heading;
  };

  // Did we hit a paddle? Reflect x.
  if (
      (ball.x == 1 || ball.x == 0 )  &&
      Math.abs(ball.y - gameState.paddles[0]) <= gameSettings.paddleRadius
    ){
      ball.heading = 0.25;
  }
  if (
      ( ball.x == matrix.width() - 1 || ball.x == matrix.width() - 2 ) &&
      Math.abs(ball.y - gameState.paddles[1]) <= gameSettings.paddleRadius
    ){
      ball.heading = 0.75;
  }

  // Check for out of x bounds, if so apply score
  if (ball.x >= 0 && ball.x <= matrix.width()) { setTimeout(() => {tick()}, (1 / ball.velocity) * 1000); };
  if (ball.x < 0) { incrementScore(0); };
  if (ball.x > matrix.width()) { incrementScore(1); };

}

function displayIntroScreen(){}

function displayGameScreen(){
  let { paddleRadius } = gameSettings;

  // Draw background:
  matrix
    .fgColor(0x002200)
    .fill();

    for (var x = 0; x < matrix.width(); x++ ) {
      for (var y = 0; y < matrix.height(); y++) {
        matrix
          .fgColor(field[y][x])
          .setPixel(x, y);
      }
  }

  matrix
    .fgColor(0x333333)
    .drawRect(0,0, matrix.width()-1, matrix.height()-1)
    .drawRect(matrix.width()/2-1, 0, matrix.width()/2, matrix.height());

  // Draw paddles
  matrix.fgColor(0xFFFFFF);
  matrix.drawLine(0, gameState.paddles[0] - paddleRadius, 0, gameState.paddles[0] + paddleRadius);
  matrix.drawLine(matrix.width()-1, gameState.paddles[1] - paddleRadius, matrix.width()-1, gameState.paddles[1] + paddleRadius);

  // Draw ball
  matrix
    .fgColor(0xBBFF00)
    .setPixel(Math.floor(gameState.ball.x), Math.floor(gameState.ball.y));
}

function displayWinScreen(){

}

function gameLoop(){
  switch(gameState.activeScreen) {
    case STATUS.PLAYING_GAME:
      displayGameScreen();
      break;
    case STATUS.INTRO:
      displayIntroScreen();
      break;
    case STATUS.WIN_SCREEN:
      displayWinScreen();
      break;
    default:
      break;
  }
}

function init (m){
    matrix = m;
    matrix.clear();
    resetGameState();
    setTimeout(tick, 3000);

    for (var y = 0; y < matrix.height(); y++) {
      field[y] = [];
      for (var x = 0; x < matrix.width(); x++ ) {
        field[y][x] = [0x002200, 0x001100, 0x001903, 0x0a110a][Math.floor(Math.random()*4)];
      }
  }


    matrix.afterSync((mat, dt, t) => {
      matrix.clear();

      gameLoop();

      setTimeout(() => matrix.sync(), 0);
    });

    matrix.sync();
}

let Pong = { init };

export { Pong };
