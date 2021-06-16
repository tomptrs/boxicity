export class Bal{
    constructor(x,y,d,f,c){
        this.x = x
        this.y = y
        this.positie = 0;
        this.diameter = d
        this.color = c
      
        this.forceX = f
        this.forceY = f
    }

    get straal(){
        return this.diameter/2
    }

    Move(){
        this.x+=this.forceX
        this.y += this.forceY
    }

    Draw(context){
       
        context.beginPath()
        context.arc(this.x,this.y,this.diameter,0,Math.PI*2,false)
        context.fillStyle= this.color
        console.log(this.x)
        context.fill()
    }
}
