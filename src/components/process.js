import * as el from "./element.js"
import * as qu from "./question.js"

export function write(command) {
    //шаблон команды: запиши {text} в поле {elementName}
    let text = command.substring(7, command.indexOf('в поле'));
    let elementName = command.substring(command.indexOf('в поле') + 7);
    if (!el.hasElement(elementName))
        return elementName + " не найден";
    let element = el.getElement(elementName);
    if (element.type !== "input")
        return elementName + " is not input";
    let elementDOM = document.getElementById(element.id);
    elementDOM.value = text;
    return "Команда выполнена";
}

export function click(command) {
    //шаблон команды: нажми кнопку {elementName}
    let elementName = command.substring(13);
    if (!el.hasElement(elementName))
        return "Нет кнопки " + elementName;
    let element = el.getElement(elementName);
    if (element.type !== "button")
        return elementName + " не является кнопкой";
    let elementDOM = document.getElementById(element.id);
    elementDOM.click();
    return "Команда выполнена";
}

export function choose(command) {
    //шаблон команды: выбери {option} в {elementName}
    let option = command.substring(7, command.indexOf(' в '));
    let elementName = command.substring(command.indexOf(' в ') + 3);
    if (!el.hasElement(elementName))
        return elementName + " не найден";
    let element = el.getElement(elementName);
    if (element.type !== "select")
        return elementName + " is not select";
    let elementDOM = document.getElementById(element.id);
    let flag = false;
    for (let i = 0; i < elementDOM.length; i++) {
        if (elementDOM[i].value === option) {
            elementDOM[i].selected = true;
            flag = true;
        }
    }
    if (flag) return "Команда выполнена";
    else return option + " не найден";
}

export function list(command) {
    //шаблон команды: перечисли варианты в {elementName}
    let elementName = command.substring(21);
    if (!el.hasElement(elementName))
        return elementName + " не найден";
    let element = el.getElement(elementName);
    if (element.type !== "select")
        return elementName + " is not select";
    let elementDOM = document.getElementById(element.id);
    let answer = 'варианты выбора:';
    for (let i = 0; i < elementDOM.length; i++) {
        answer +=  '\n\t-' + elementDOM[i].value;
    }
    return answer;
}

export function processCommand(command) {
    let keyWord = command.substring(0, command.indexOf(' '));
    let answer;
    switch (keyWord) {
        case "запиши":
            answer = write(command);
            break;
        case "нажми":
            answer = click(command);
            break;
        case "выбери":
            answer = choose(command);
            break;
        case "перечисли":
            answer = list(command);
            break;
        default:
            answer = "default";
    }
    return answer;
}

export function processQuestion(question) {
    let answer;
    if (qu.questionAnswerMap.has(question)) {
        answer = qu.questionAnswerMap.get(question);
    } else {
        answer = "команда не найдена";
    }
    return answer;
}

export function preprocessCommand(command) {
    command = command.toLowerCase();
    command = command.replace(/[.,!?]/g, "").replace(/\s{2,}/g, " ");
    return command;
}

export function process(command) {
    command = preprocessCommand(command);
    let answer = processCommand(command);
    if (answer === "default")
        answer = processQuestion(command);
    return answer;
}