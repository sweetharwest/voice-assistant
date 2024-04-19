export class Element{
    id;
    name;
    type;
    constructor(id, name, type) {
        this.id = id;
        this.name = name;
        this.type = type;
    }
}

export const elements = [
    new Element("testInput", "контрольная работа", "input"),
    new Element("testButton", "отправить", "button"),
    new Element("testSelect", "вариант", "select"),
]

export function hasElement(name) {
    return elements.some(el => el.name === name);
}

export function getElement(name) {
    return elements.find(el => el.name === name);
}