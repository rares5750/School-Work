let bubbles;
let playing = true;
let poses = [];

let bodyPose, video, connections;

let leftHand;
let rightHand;

let windowImg;
let song;
let windowSillImg;

let timer = 120;
let levelTimer = 30;
let score = 0;
let level = 1;


function preload(){
	windowImg = loadImage("window.png");
	song = loadSound("windows.mp3");
	windowSillImg = loadImage("windowsill.png");
	bodyPose = ml5.bodyPose();
}

function gotPoses(results){
	poses = results;
}

function setup() {
	new Canvas(500, 800);
	displayMode('centered');

	video = createCapture(VIDEO);
	video.size(1000, 700);
	video.hide();
	bodyPose.detectStart(video,gotPoses);
	connections = bodyPose.getSkeleton();

	bubbles = new Group();
	bubbles.collider = "n";
	bubbles.diameter = 40;
	bubbles.x = () => random(50, width-50);
	bubbles.y = () => random(50, height-50);
	bubbles.amount = 1000;
	bubbles.color = "white";
	bubbles.opacity = 0.1;
	bubbles.strokeWeight = 0;

	leftHand = new Sprite();
	leftHand.radius = 30;
	leftHand.color = "blue";
	leftHand.collider = "n";
	rightHand = new Sprite();
	rightHand.radius = 30;
	rightHand.color = "red";
	rightHand.collider = "n";
}

function draw() {
	background('gray');

	image(windowImg, 0, 0, width, height);

	allSprites.draw();

	image(windowSillImg, 0, height-200, width, 200);
	textSize(40);
	rectMode(CENTER);
	fill(255);
	rect(100,40,100,50);
	rect(width/2, 40, 100, 50);
	rect(width - 100, 40,100,50);

	fill(0);
	textAlign(CENTER);
	text(floor(timer) + "s", 100, 50);
	text(floor(level), 250, 50);
	text(floor(score), 400, 50);

	
}

function scoring(h, b){
	b.remove();
	score += 1;
}

function secondsTimer(){
	timer -= 1;
	levelTimer -= 1;
}

function nextLevel(){
	if(timer == 0){
		playing = false;
	}
	else if(levelTimer == 0 || bubbles.length < 50){
		levelTimer = 30;
		bubbles.x = () => random(50, width-50);
		bubbles.y = () => random(50, height-50);
		bubbles.amount = 1000;
		level += 1;
	}
}

function update(){
	if(playing){
		nextLevel();
		if(poses[0]){
			rightHand.moveTo((width+100) - poses[0].right_wrist.x, poses[0].right_wrist.y, 10);
			leftHand.moveTo((width+100) - poses[0].left_wrist.x, poses[0].left_wrist.y, 10);
		}
	}
}
	
