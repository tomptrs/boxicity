import { Vector2 } from "./Vector2.js";

export class Pawn{
    constructor(location, currentSpot, shape){
        this.location = location;
        this.currentSpot = currentSpot;
        this.shape = shape;
        this.color = `#${Math.floor(Math.random()*16777215).toString(16)}`;

        this.randomRange = 50;
    }

    Move(newSpot){
        this.currentSpot = newSpot;

        var randX = Math.floor(Math.random() * this.randomRange) * (Math.round(Math.random()) * 2 - 1);
        var randY = Math.floor(Math.random() * this.randomRange) * (Math.round(Math.random()) * 2 - 1);

        this.location = newSpot.location;
        this.location.Add(new Vector2(randX, randY));
    }

    Draw(context){
        context.beginPath()
        context.arc(this.location.x, this.location.y, 20, 0, Math.PI*2, false)
        context.fillStyle = this.color;
        context.fill()
    }
}