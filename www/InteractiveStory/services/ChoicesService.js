class Choice{
    constructor(textC1, videoNameC1, textC2, videoNameC2){
        this.textC1 = textC1;
        this.videoNameC1 = videoNameC1;

        this.textC2 = textC2;
        this.videoNameC2 = videoNameC1;

        this.videos = [videoNameC1, videoNameC2]
    }
}

export var allChoices = [];

allChoices.push(new Choice("Hoe heeft uw dit bedrijf ontdekt?", "s2-c1", "U heeft u opgemaakt...", "s2-c2"))
allChoices.push(new Choice("Wat is uw burgelijke staat?", "s3-c1", "Wat is uw meerwaarde?", "s3-c2"))
allChoices.push(new Choice("Ja, dat kan wel.", "s4-c1", "Dat weet ik nog niet.", "s4-c2"))
allChoices.push(new Choice("Dat beantwoord ik liever niet.", "s5-c1", "Ik voel me nogal onconfortabel.", "s5-c2"))
allChoices.push(new Choice("Daar ga ik niet mee akkoord.", "s6-c1", "Als dat hetzelfde is als een man.", "s6-c2"))
