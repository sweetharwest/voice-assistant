/*export const questionAnswerMap = new Map([
    ['как отправить работу', 'Для того чтобы отправить работу нужно выбрать название контрольной, вариант работы и задание. После этого прикрепить файлы и нажать кнопку отправить.'],
    ['что ты умеешь', 'Я умею записывать, отправлять, перечислять и выбирать']]);*/

export class Question{
    question;
    answer;
    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
    }
}