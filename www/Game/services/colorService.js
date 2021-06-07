export class Color{

    constructor(){
        this.colors = []
        this.colors.push('#8fabda');
        this.colors.push('#69c2c0');
        this.colors.push('#fbb919');
        this.colors.push('#e9570d');
        this.colors.push('#0072ce');
        this.colors.push('#ef008c');
        this.colors.push('#e5c4a9');
        this.colors.push('#ef7d00');

        this.usedColors = [];
    }

    GetColor(playerIndex){
        /*var randomIndex = Math.round(Math.random() * this.colors.length);

        while (this.IsUsedColor(this.colors[randomIndex])){
            randomIndex = Math.round(Math.random() * (this.colors.length - 1));
        }

        console.log(this.colors[randomIndex])

        this.usedColors.push(this.colors[randomIndex]);*/
        return this.colors[playerIndex];
    }

    IsUsedColor(c){
        this.usedColors.forEach(uc => {
            if (uc == c)
                return true;
        });

        return false;
    }
}