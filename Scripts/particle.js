export class Particle {
    positionX;
    positionY;
    radius;
    velocityX;
    velocityY;
    acceleration=0.098;
    bounce = 0.7;
    bounceQuantity = 1;

    constructor(x,y,r,dx,dy){
        this.positionX = x;
        this.positionY = y;
        this.radius = r;
        this.velocityX = dx;
        this.velocityY = dy;
    }

    gravity(canvas){

        if(this.bounceQuantity>10)return;

        if(( this.positionY + this.radius ) > canvas.height){
            this.positionY = canvas.height-this.radius;
            this.velocityY = -this.velocityY * this.bounce;
            this.bounceQuantity ++;
        }

        if((this.positionX +this.radius)>canvas.width){
            this.positionX = canvas.width - this.radius;
            this.velocityX = -this.velocityX * this.bounce;
        }
        if(this.positionX-this.radius < 0 ){
            this.positionX = this.radius;
            this.velocityX = -this.velocityX * this.bounce;
        }
        
        this.positionX = this.positionX+this.velocityX*0.8;
        this.positionY = this.positionY+this.velocityY*0.8;

        this.velocityY = this.velocityY+this.acceleration;
    }

    zerogravity(canvas,center){

        if(( this.positionY + this.radius ) > canvas.height){
            this.positionY = canvas.height-this.radius;
            this.velocityY = -this.velocityY * this.bounce;
        }

        if((this.positionX +this.radius)>canvas.width){
            this.positionX = canvas.width - this.radius;
            this.velocityX = -this.velocityX * this.bounce;
        }
        if(this.positionX-this.radius < 0 ){
            this.positionX = this.radius;
            this.velocityX = -this.velocityX * this.bounce;
        }

        let angle = Math.atan2((center.y-this.positionY),(center.x-this.positionX));
        
        this.velocityY = this.velocityY+this.acceleration*Math.sin(angle);
        this.velocityX = this.velocityX+this.acceleration*Math.cos(angle);
        this.positionX = this.positionX+this.velocityX*0.4;
        this.positionY = this.positionY+this.velocityY*0.4;
    }
}