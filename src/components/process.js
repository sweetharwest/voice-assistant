export class Process {
    dataMap;

    constructor(dataMap) {
        this.dataMap = dataMap;
    }

    do(request) {
        //форматирование входящего запроса
        request = request.toLowerCase();
        request = request.replace(/[.,!?]/g, "").replace(/\s{2,}/g, " ");

        //обработка входящего запроса
        for (let dataKeyValue of this.dataMap) {
            let data = JSON.parse(dataKeyValue[0]);
            let keyPhrase = data.keyPhrase;
            if (request.startsWith(keyPhrase)) {
                switch (data.type){
                    case "command":
                        if (data.hasParam) {
                            let param = request.substring(data.keyPhrase.length + 1);
                            data.param.push(param);
                        }
                        let serializedData = JSON.stringify(data);
                        return dataKeyValue[1](serializedData);
                    case "question":
                        if (request === keyPhrase) {
                            return data.answer;
                        }
                }

            }
        }
        return "команда не найдена";
    }
}