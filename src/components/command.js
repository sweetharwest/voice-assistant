export class Command{
    keyPhrase;
    method;
    type;
    constructor(keyPhrase, method, type) {
        this.keyPhrase = keyPhrase;
        this.method = method;
        this.type = type;
    }
}