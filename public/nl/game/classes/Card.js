export class Card{
    constructor(question, answer){
        this.question = question;
        this.answer = answer;
    }
}

export class QuestionCard{
   constructor(question, answer, choices, correctChoice){
        this.question = question;
        this.answer = answer;
        this.choices = choices;
        this.correctChoice = correctChoice;
   }
}

export class RevealCard{
    constructor(question, answer, revealText){
        this.question = question;
        this.answer = answer;
        this.revealText = revealText;
    }
}

export class QuestionRevealCard{
    constructor(question, answer, choices, correctChoice, revealText){
        this.question = question;
        this.answer = answer;
        this.choices = choices;
        this.correctChoice = correctChoice;
        this.revealText = revealText;
   }

}