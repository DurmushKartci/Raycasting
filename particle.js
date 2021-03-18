class Particle{

    constructor(){
        this.fov = 40;
        this.pos = createVector(width/2, height/2)
        this.rays = [];
        this.heading = 0;
        for(let a = -this.fov / 2 ; a <= this.fov / 2 ; a += 1){
            this.rays.push(new Ray(this.pos , radians(a)));
        }
    }

    show(){
        fill(0,150,0);
        strokeWeight(3);
        ellipse(this.pos.x,this.pos.y,3);
        for ( let ray of this.rays){
            ray.show();
        }
    }

    rotate(angleA){
        this.heading += angleA;

        let index = 0;
        for(let a = -this.fov / 2 ; a <= this.fov / 2 ; a += 1){
            //this.rays[i].setAngleRay(radians(i) + this.heading);
            this.rays[index].setAngle(radians(a) + this.heading);
            index ++;
        }
    }

    move(amt){
        const vel = p5.Vector.fromAngle(this.heading);
        vel.setMag(amt);
        this.pos.add(vel);

    }

    look(walls){
        const scene = []
        for ( let i= 0; i < this.rays.length ; i ++){
            const ray = this.rays[i];
            let closest = null;
            let record = Infinity;
            for ( let wall of walls){
                const pt = ray.cast(wall);
                if(pt){
                    const d = p5.Vector.dist(this.pos , pt);
                    if(d < record){
                        record = d;
                        closest = pt;
                    }
                    record = min(d,record);
                    
                    
                }
            }
            if(closest ){
                stroke(0,150,0);
                strokeWeight(0.5)
                line(this.pos.x,this.pos.y,closest.x,closest.y)
            }
            scene[i] = record;
            
        }
        return scene;
        
    }

    update(x,y){
        this.pos.set(x, y);
    }

    updateFOV(fov){
        this.fov = fov;

        this.rays = [];
        for(let a = -this.fov / 2 ; a <= this.fov / 2 ; a += 1){
            this.rays.push(new Ray(this.pos , radians(a)));
        }
    }
}

