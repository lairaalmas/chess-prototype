// gameplay
let isClicked = false;
let squares = [[], [], [], [], [], [], [], []];

// visual
const canvasSize = 720;
const squareSize = canvasSize / 11;
const colors = {
  whiteSquares: "0xd9f0ff",
  blackSquares: "0x0f85d4",
  whitePieces: "0xfff",
  blackPieces: "0x4a4a4a",
  white: "0xfff",
  black: "0x312e2b",
  purple: "0x6666ff",
};
const fonts = {
  default: {
    fontFamily: "Courier",
    fontSize: 32,
    fontWeight: "bold",
    color: colors.white.replace("0x", "#"),
  },
};
const square = {
  width: squareSize,
  x: squareSize * 2,
  y: squareSize * 2,
  pieces1stRow: [
    "rook",
    "knight",
    "bishop",
    "queen",
    "king",
    "bishop",
    "knight",
    "rook",
  ],
};

// setup
const gameCanvas = document.querySelector("#game-canvas");
const config = {
  type: Phaser.AUTO,
  width: canvasSize,
  height: canvasSize,
  backgroundColor: "0x312e2b",
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  canvas: gameCanvas,
};
const game = new Phaser.Game(config);

function preload() {
  this.load.image("white-pawn", "assets/white-pawn.png");
  this.load.image("white-rook", "assets/white-rook.png");
  this.load.image("white-knight", "assets/white-knight.png");
  this.load.image("white-bishop", "assets/white-bishop.png");
  this.load.image("white-queen", "assets/white-queen.png");
  this.load.image("white-king", "assets/white-king.png");
  this.load.image("black-pawn", "assets/black-pawn.png");
  this.load.image("black-rook", "assets/black-rook.png");
  this.load.image("black-knight", "assets/black-knight.png");
  this.load.image("black-bishop", "assets/black-bishop.png");
  this.load.image("black-queen", "assets/black-queen.png");
  this.load.image("black-king", "assets/black-king.png");
}

function create() {
  // creating the board
  for (let row = 0, isWhite = false; row < 8; row++) {
    isWhite = !isWhite;

    for (let col = 0; col < 8; col++) {
      const color = isWhite ? colors.whiteSquares : colors.blackSquares;
      isWhite = !isWhite;

      const x = square.x + square.width * col;
      const y = square.y + square.width * row;

      this.add.rectangle(x, y, square.width, square.width, color);

      squares[row][col] = { x: x, y: y, piece: "empty" };
    }
  }

  // add pieces
  for (let row = 0; row < 8; row += 7) {
    const color = row === 7 ? "white" : "black";
    for (let col = 0; col < 8; col++) {
      squares[row][col].color = color;
      squares[row][col].piece = square.pieces1stRow[col];
    }
  }
  for (let col = 0; col < 8; col++) {
    squares[1][col].piece = "pawn";
    squares[1][col].color = "black";
    squares[6][col].piece = "pawn";
    squares[6][col].color = "white";
  }

  for (let row in squares) {
    for (let col in squares[row]) {
      const cur = squares[col][row];
      if (cur.piece !== "empty") {
        const img = this.add.sprite(cur.x, cur.y, `${cur.color}-${cur.piece}`);
        img.displayWidth = squareSize;
        img.displayHeight = squareSize;
      }
    }
  }

  // labels
  for (let row in squares) {
    // vertical
    let x = squares[row][0].x - squareSize;
    let y = squares[row][0].y;
    let curValue = 8 - parseInt(row);

    this.add.text(x, y, curValue, fonts.default).setOrigin(0.5, 0.5);

    // horizontal
    x = y;
    y = squares[7][0].y + squareSize;
    curValue = String.fromCharCode(65 + parseInt(row));

    this.add
      .text(x, y, curValue, fonts.default, colors.white)
      .setOrigin(0.5, 0.5);
  }
}

function update() {}
