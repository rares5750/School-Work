let player, zombies, bullets, blood;

let map, playerImg, zombieImg, bulletImg, zombieFont;

let score = 0;
let hp = 100;

let xDist;
let yDist;
let angleToMouse;
let xVector;
let yVector;

function preload(){
	map = loadImage("bgImg.png");
	playerImg = loadImage("playerImg.png");
	zombieImg = loadImage("zombieIm.png");
	bulletImg = loadImage("hand_gun_bullet.png");
	zombieFont = loadFont("zombie.ttf");
}

function setup() {
	new Canvas(750, 750);
	displayMode('centered');

	player = new Sprite(width/2, height/2, 20);
	player.color = "blue";
	player.collider = "s";

	bullets = new Group();
	bullets.color = "gray";
	bullets.diameter = 5;
	bullets.collider = "d";
	bullets.alreadyShot = false;

	blood = new Group();
	blood.color = "red";
	bullets.diameter = 5;
	bullets.collider = "d"

	zombies = new Group();
	zombies.diameter = 20;
	zombies.collider = "d";
	zombies.color = "green";

	player.overlaps(bullets);
	player.overlaps(blood);
	bullets.overlaps(blood);

	setInterval(spawnZombie, 1000);
	setInterval(shooting, 100);
}

function draw() {
	background("lightblue")
	image(map, 0, 0, width, height);

	for(zombie of zombies){
		zombie.speed = 3.5;
		zombie.moveTo(player);
	}

	for(bullet of bullets){
		if(!bullet.alreadyShot){
			bullet.direction = bullet.angleTo(mouse);
			bullet.speed = 19.5;
			bullet.alreadyShot = true;
		}
		if(bullet.collided(zombies)){
			for(zombie of zombies){
				if(bullet.collided(zombie)){
					zombie.remove();
					bullet.remove();
					score++;
				}
			}
		}
	}

	if(kb.pressing("w")){
		player.y -= 4;
	}
	if(kb.pressing("s")){
		player.y += 4;
	}
	if(kb.pressing("d")){
		player.x += 4;
	}
	if(kb.pressing("a")){
		player.x -= 4;
	}


}

function spawnZombie(){
	spawnDecider = random();
	if(spawnDecider > 0.5){
		new zombies.Sprite(random(0, width), Math.round(random(0,1))*height);
	}
	else{
		new zombies.Sprite(Math.round(random(0,1))*width, random(0, height));
	}
}

function shooting(){
	if(mouse.pressing()){
		new bullets.Sprite(player.x, player.y);
	}
}

function loseHealth(p,z){
	hp -= 0.01;
	let b = new blood.Sprite(p.x, p.y);
	b.vel.x = random(0,3);
	b.vel.y = random(0,3);
}
