export class Vector2{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    Add(vector2){
        this.x += vector2.x;
        this.y += vector2.y;
    }
}
