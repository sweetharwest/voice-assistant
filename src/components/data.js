const commandData1 = {
    keyPhrase: "нажми кнопку отправить",
    param: [],
    type: "command",
    hasParam: false,
}
export const serializedCommandData1 = JSON.stringify(commandData1);

const commandData2 = {
    keyPhrase: "запиши",
    param: [],
    type: "command",
    hasParam: true,
}
export const serializedCommandData2 = JSON.stringify(commandData2);

const commandData3 = {
    keyPhrase: "выбери вариант",
    param: [],
    type: "command",
    hasParam: true,
}
export const serializedCommandData3 = JSON.stringify(commandData3);

const commandData4 = {
    keyPhrase: "как отправить работу",
    answer: "Для того чтобы отправить работу нужно выбрать название контрольной, вариант работы и задание. После этого прикрепить файлы и нажать кнопку отправить.",
    type: "question",
}
export const serializedCommandData4 = JSON.stringify(commandData4);

const commandData5 = {
    keyPhrase: "что ты умеешь",
    answer: "Я умею записывать, отправлять, перечислять и выбирать.",
    type: "question",
}
export const serializedCommandData5 = JSON.stringify(commandData5);

const infoData = {
    info: ['Как отправить работу?',
        'Что ты умеешь?',
        'Нажми кнопку отправить',
        'Запиши молоко в поле контрольная работа',
        'Выбери вариант 1'],
}
export const serializedInfoData = JSON.stringify(infoData);