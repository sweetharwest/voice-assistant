const data1 = {
    keyPhrase: "нажми кнопку отправить",
    param: [],
    type: "command",
    hasParam: false,
}
export const serializedData1 = JSON.stringify(data1);

const data2 = {
    keyPhrase: "запиши",
    param: [],
    type: "command",
    hasParam: true,
}
export const serializedData2 = JSON.stringify(data2);

const data3 = {
    keyPhrase: "выбери вариант",
    param: [],
    type: "command",
    hasParam: true,
}
export const serializedData3 = JSON.stringify(data3);

const data4 = {
    keyPhrase: "как отправить работу",
    param: "Для того чтобы отправить работу нужно выбрать название контрольной, вариант работы и задание. После этого прикрепить файлы и нажать кнопку отправить.",
    type: "question",
    hasParam: false,
}
export const serializedData4 = JSON.stringify(data4);

const data5 = {
    keyPhrase: "что ты умеешь",
    param: "Я умею записывать, отправлять, перечислять и выбирать.",
    type: "question",
    hasParam: false,
}
export const serializedData5 = JSON.stringify(data5);