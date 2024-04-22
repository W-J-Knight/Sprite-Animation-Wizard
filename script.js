// wrap in load event
window.addEventListener("load", function () {
  // canvas
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");

  const CANVAS_WIDTH = (canvas.width = 800); //same as css width
  const CANVAS_HEIGHT = (canvas.height = 600); //same as css width

  // player class
  class Player {
    constructor(width, height, movesObject, defaultMove) {
      this.width = width;
      this.height = height;
      this.movesObject = movesObject;
      this.image = new Image();
      this.frameX = 0;
      this.frameY = 0;
      this.defaultMove = defaultMove;
    }
    // update class
    update() {
      this.move = this.movesObject[this.defaultMove];
      this.src = this.move.src;
      this.maxFrames = this.move.maxFrames;
      this.movesStaggerFrames = this.move.movesStaggerFrames;
    }
    // drawImage
    draw(position) {
      this.image.src = this.src;
      // context.drawImage(img, sx, sy, swidth, sheight, x, y, width, height)
      ctx.drawImage(
        this.image,
        this.width * position,
        this.height * this.frameY,
        this.width,
        this.height,
        0,
        0,
        CANVAS_WIDTH,
        CANVAS_HEIGHT
      );
    }
  }
  //assets/wizard/Attack_1.png
  let gameFrame = 0;
  // variables

  // move list~
  const moveList = {
    idle: {
      src: "./assets/wizard/Idle.png",
      maxFrames: 6,
      movesStaggerFrames: 8,
    },
    idle2: {
      src: "./assets/wizard/Idle_2.png",
      maxFrames: 5,
      movesStaggerFrames: 8,
    },
    walk: {
      src: "./assets/wizard/Walk.png",
      maxFrames: 7,
      movesStaggerFrames: 12,
    },
    run: {
      src: "./assets/wizard/Run.png",
      maxFrames: 8,
      movesStaggerFrames: 4,
    },
    jump: {
      src: "./assets/wizard/Jump.png",
      maxFrames: 11,
      movesStaggerFrames: 5,
    },
    attack1: {
      src: "./assets/wizard/Attack_1.png",
      maxFrames: 10,
      movesStaggerFrames: 5,
    },
    attack2: {
      src: "./assets/wizard/Attack_2.png",
      maxFrames: 4,
      movesStaggerFrames: 5,
    },
    attack3: {
      src: "./assets/wizard/Attack_3.png",
      maxFrames: 7,
      movesStaggerFrames: 5,
    },
    hurt: {
      src: "./assets/wizard/Hurt.png",
      maxFrames: 4,
      movesStaggerFrames: 5,
    },
    dying: {
      src: "./assets/wizard/Dead.png",
      maxFrames: 4,
      movesStaggerFrames: 18,
    },
  };
  // initialize a new player
  const player_1 = new Player(128, 128, moveList, "run");

  player_1.defaultMove = "idle";
  const dropdown = document.getElementById("animations");
  dropdown.addEventListener("change", function (e) {
    player_1.defaultMove = e.target.value;
  });

  // animate functions
  function animate() {
    player_1.update();
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position =
      Math.floor(gameFrame / player_1.movesStaggerFrames) % player_1.maxFrames;
    // context.drawImage(img, sx, sy, swidth, sheight, x, y, width, height)
    player_1.draw(position);
    gameFrame++;
    requestAnimationFrame(animate);
  }

  animate();
});
