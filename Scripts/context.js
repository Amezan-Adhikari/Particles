let ctx;


export function setContext(canvas){
        ctx = canvas.getContext("2d");
    }



export function getContext(){
        return ctx;
    }


