const Engine=Matter.Engine;
const World=Matter.World;
const Bodies=Matter.Bodies;

var engine,world;
var ground;

var boxes=[];
var gravitychooser;
function setup(){
    var canvas = createCanvas(400,400);
    engine = Engine.create();
    world = engine.world;
    Engine.run(engine); 

    gravitychooser = createSlider(0, 150, 50);
    gravitychooser.position(40, 365);    

    gravitychooser.input = map(engine.world.gravity, gravitychooser.min, gravitychooser.max, 0, 100);

    var ground_options ={
        isStatic: true
    }


        
    ground = Bodies.rectangle(200,330,200,20,ground_options);
    World.add(world,ground);

    console.log(ground);


}
function mousePressed() {
    if (keyDown("k") ) {
        boxes.push(new Box(mouseX, mouseY, random(10, 40), random(10, 40)));
    }
}


function draw(){
    background(0);
    rectMode(CENTER);
    
    Engine.update(engine);
    rectMode(CENTER);
    rect(ground.position.x,ground.position.y,400,20);

    for (var i = 0; i < boxes.length; i++) {
        boxes[i].show();
    }
    var value=gravitychooser.value();
    noStroke();
    fill(170);
    strokeWeight(4);
    rectMode(CENTER);
    fill(255);
    textSize(15);
    text("Gravity " + value, 180, 381);

     mousePressed();

}

function Box(x, y, w, h, options) {
    var options = {
        friction: 0.5,
        restitution: 0.5,
    }
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);
 
    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;
 
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(1);
        stroke(255);
        fill(127);
        rect(0, 0, this.w, this.h);
        pop();
    }

}