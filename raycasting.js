
let walls = [] ;
let ray ;
let particle ;
let bCount = 7;
let sliderFOV ;

const sceneW =  500;
const sceneH =  500;


function setup(){

    createCanvas(1000,500);
    for(let i = 0 ; i < bCount; i++){
        let x1 = random(width - sceneW);
        let y1 = random(height);
        let x2 = random(width - sceneW);
        let y2 = random(height);
        walls[i] = new Boundary(x1,y1,x2,y2);
    }
    walls.push(new Boundary(0 , 0 , width  , 0 ));
    walls.push(new Boundary(0 , 0 , 0 , height ));
    walls.push(new Boundary(width - sceneW , 0 , width - sceneW , height ));
    walls.push(new Boundary(width  , 0 , width  , height ));
    walls.push(new Boundary(0 , height , width  , height ));

    particle = new Particle();
    particle.update(250,250);
    sliderFOV = createSlider(0, 90, 40);
    sliderFOV.input(changeFOV);
    
}

function changeFOV(){
    const fov = sliderFOV.value();
    particle.updateFOV(fov);
}

function draw(){
    background(0);

    

    if(mouseX < width - sceneW && mouseX > 0 && mouseY < height && mouseY > 0){
        particle.show();
        particle.look(walls);
        
    }

    rectMode(CENTER);
    fill(233)
    noStroke();
    rect(sceneW*1.5, 0, width /2, height)
    fill(50,255,50);
    rect(sceneW*1.5, height  , width/2, height)

    const scene = particle.look(walls);
    const w = sceneW / scene.length;
    push();
    translate(sceneW, 0)
    for(let i = 0 ; i < scene.length;i++){
        const sq = scene[i] * scene[i]
        const wSq = sceneW * sceneW;
        const b = map(sq, 0, wSq, 250, 0);
        const h = map(sq, 0, wSq, sceneH, 0);
        rectMode(CENTER);
        fill(b)
        noStroke();
        rect(i * w + w /2 + 3 , sceneH /2  , w+1 , h-5);
            
    }
    pop();
    fill(0);
    stroke(0);
    line(743.5, 250,756.5 , 250 );
    line(750, 243.5, 750 , 256.5);
    
    if(keyIsDown(LEFT_ARROW)){
        particle.rotate(-0.025);
    }

    if(keyIsDown(RIGHT_ARROW)){
        particle.rotate(0.025)
    }

    if(keyIsDown(UP_ARROW)){
        particle.move(2);
        console.log("LAYN")
    }

    if(keyIsDown(DOWN_ARROW)){
        particle.move(-2)
        console.log("LAYN")

    }

    for(let wall of walls){
        wall.show();
    }
    
    
}

function mouseClicked(){
    if(mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0){
    
        for(let i = 0 ; i < bCount; i++){
            let x1 = random(width - sceneW);
            let y1 = random(height);
            let x2 = random(width - sceneW);
            let y2 = random(height);
            walls[i] = new Boundary(x1,y1,x2,y2);
        }
        
    }
}



