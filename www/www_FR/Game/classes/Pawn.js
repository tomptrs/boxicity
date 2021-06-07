import { Color } from "../services/colorService.js";
import { Vector2 } from "./Vector2.js";

export class Pawn{
    constructor(location, currentSpot, shape, color){
        this.location = location;
        this.currentSpot = currentSpot;
        this.shape = shape;
        //this.color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        //this.color = "hsl(" + 360 * Math.random() + ',' + (25 + 70 * Math.random()) + '%,' + (85 + 10 * Math.random()) + '%)';
        
        /*var hue = Math.floor(Math.random() * 360);
        var pastel = 'hsl(' + hue + ', 100%, 80%)';
        this.color = pastel;*/

        this.color = color;
        this.reachedFinish = false;

        this.randomRange = 30;
    }

    Move(newSpot){
        this.currentSpot = newSpot;

        var randX = Math.floor(Math.random() * this.randomRange) * (Math.round(Math.random()) * 2 - 1);
        var randY = Math.floor(Math.random() * this.randomRange) * (Math.round(Math.random()) * 2 - 1);

        this.location = JSON.parse(JSON.stringify(newSpot.location));
        this.location.x += randX;
        this.location.y += randY;
    }

    Draw(context){
        context.beginPath();
        context.arc(this.location.x, this.location.y, 22, 0, Math.PI*2, false);
        context.fillStyle = '#000000';
        context.fill();
        
        context.beginPath()
        context.arc(this.location.x, this.location.y, 20, 0, Math.PI*2, false)
        context.fillStyle = this.color;
        context.fill()
    }
}