class Choice{
    constructor(question, textC1, videoNameC1, textC2, videoNameC2){
        this.question = question

        this.textC1 = textC1;
        this.videoNameC1 = videoNameC1;

        this.textC2 = textC2;
        this.videoNameC2 = videoNameC1;

        this.videos = [videoNameC1, videoNameC2]
    }
}

export var allChoices = [];

/*allChoices.push(new Choice("Hoe heeft u dit bedrijf ontdekt?", "s2-c1", "U heeft u opgemaakt.", "s2-c2"))
allChoices.push(new Choice("Wat is uw burgelijke staat?", "s3-c1", "Wat is uw meerwaarde?", "s3-c2"))
allChoices.push(new Choice("Ja, dat kan wel.", "s4-c1", "Dat weet ik nog niet.", "s4-c2"))
allChoices.push(new Choice("Dat beantwoord ik liever niet.", "s5-c1", "Ik voel me nogal oncomfortabel.", "s5-c2"))
allChoices.push(new Choice("Daar ga ik niet mee akkoord.", "s6-c1", "Als dat hetzelfde is als een man.", "s6-c2"))*/

allChoices.push(new Choice("What should the interviewer ask?", "How did you discover this company?", "s2-c1", "Looks like you prettied yourself up.", "s2-c2"))
allChoices.push(new Choice("What should the interviewer ask?", "Are you married?", "s3-c1", "What is your added value?", "s3-c2"))
allChoices.push(new Choice("What should Ms. Chikua answer?", "Yes, I might.", "s4-c1", "Not really sure at this point.", "s4-c2"))
allChoices.push(new Choice("What should Ms. Chikua answer?", "I'd rather not answer that right now.", "s5-c1", "I feel a little uncomfortable.", "s5-c2"))
allChoices.push(new Choice("What should Ms. Chikua answer?", "I don't agree.", "s6-c1", "If that's the same as my male counterpart.", "s6-c2"))
