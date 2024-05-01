export class Process{
    questions;
    commands;

    constructor(questions, commands) {
        this.questions = questions;
        this.commands = commands;
    }

    do(request) {
        request = request.toLowerCase();
        request = request.replace(/[.,!?]/g, "").replace(/\s{2,}/g, " ");

        for (let i = 0; i < this.questions.length; i++) {
            if (this.questions[i].question === request) {
                return this.questions[i].answer;
            }
        }

        for (let i = 0; i < this.commands.length; i++) {
            if (request.startsWith(this.commands[i].keyPhrase)) {
                switch (this.commands[i].type) {
                    case "none":
                        return this.commands[i].method();
                    case "write":
                        let text = request.substring(this.commands[i].keyPhrase.length + 1);
                        return this.commands[i].method(text);
                    case "choose":
                        let option = request.substring(this.commands[i].keyPhrase.length + 1);
                        return this.commands[i].method(option);
                    default:
                        return "тип команды не найден";
                }
            }
        }
        return "команда не найдена";
    }
}