let map, ground, brick, questionBox, pipe, goomba, mario, coins = 0;
let tileSize = "10";
let brickImg, groundImg, qImg, pipeImg, goombaImg, marioImg;

function preload(){
	brickImg = loadImage("brick.png");
	groundImg = loadImage("ground.png");
	qImg = loadImage("question2.png");
	pipeImg = loadImage("pipeleft.png");
	goombaImg = loadImage("goomba.png");
	marioImg = loadImage("Mario.png");
}

function setup() {
	new Canvas(500, 500);
	displayMode('centered');

	allSprites.pixelPerfect = true;
	world.gravity.y = 10;
	world.autoStep = false;

	walkable = new Group();
	ground = new walkable.Group();
	ground.collider = "s";
	ground.image = groundImg;
	ground.tile = "=";
	ground.w = tileSize;
	ground.h = tileSize - 4;
	ground.friction = 0;

	brick = new walkable.Group();
	brick.collider = "s";
	brick.image = brickImg;
	brick.tile = "b";
	brick.w = tileSize - 5;
	brick.h = tileSize - 5;

	questionBox = new walkable.Group();
	questionBox.collider = "s"
}

function draw() {
	background('skyblue')
}
