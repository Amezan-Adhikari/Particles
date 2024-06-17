let canvas = document.getElementById("canvas");

import { getContext, setContext } from "./context.js";
setContext(canvas);


import { state } from "./store.js";

import { render } from "./renderer.js";

import { Particle } from "./particle.js";

let particles = [];
let center = {}
let prevTimeStamp = 0;
let FPS = 60;
const frameTime = 1000 / FPS;

function animate(timestamp) {
  let deltaTime = (timestamp - prevTimeStamp) / 1000;
  prevTimeStamp = timestamp;

  if (deltaTime <= frameTime) {
    getContext().clearRect(0, 0, canvas.width, canvas.height);


    if(zerogravity){
        particles.forEach((particle)=>{
            render(particle.positionX, particle.positionY, particle.radius, state.particleColor);
            particle.zerogravity(canvas,center);
        })
    }
    else{
        particles.forEach((particle)=>{
            render(particle.positionX, particle.positionY, particle.radius, state.particleColor);
            particle.gravity(canvas);
        })
    }
  }

  const simulation = requestAnimationFrame(animate);
}

animate();


function changeColor(e){
   state.particleColor =  e.target.value;
}

let zerogravity = false;
let held = false;
canvas.addEventListener("mousemove", (e) => {

    if(!held || zerogravity)return;
        particles = [
            ...particles,
            new Particle(Math.round(e.clientX - (window.innerWidth/2-canvas.width/2)), Math.round(e.clientY - (window.innerHeight/2-canvas.height/2)), state.ParticleSize , 0, 0),
          ];

});

canvas.addEventListener("mousedown",()=>{
    held = true;
})
canvas.addEventListener("mouseup",()=>{
    held = false;
})


canvas.addEventListener("mousemove",(e)=>{
    center = {
        x:Math.round(e.clientX - (window.innerWidth/2-canvas.width/2)),
        y:Math.round(e.clientY - (window.innerHeight/2-canvas.height/2))
    }
})


window.addEventListener("keydown",(e)=>{

    if(e.key == "Shift"){
        zerogravity = !zerogravity;
    }
    if(!zerogravity){
        particles.forEach(particle=>{
            particle.bounceQuantity = 1;
        })
    }
})




document.getElementById("particleColor").addEventListener("input",(e)=>{
 changeColor(e);
});

document.getElementById("particleSize").addEventListener("input",(e)=>{
    changeParticleSize(e);
   });