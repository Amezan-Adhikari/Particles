import { getContext } from "./context.js"


export const render=(positionX, positionY, radius, color)=>{
    let ctx = getContext();
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(positionX,positionY,radius,0,2*Math.PI);
    ctx.fill();

}