import {serializedData1} from "@/components/data.js";

export class Process2{
    dataMap

    constructor(dataMap) {
        this.dataMap = dataMap;
        console.log("process 2 constr");
    }

    do(request) {
        request = request.toLowerCase();
        request = request.replace(/[.,!?]/g, "").replace(/\s{2,}/g, " ");
        console.log("preprocess");

        for (let dataKeyValue of this.dataMap) {
            let data = JSON.parse(dataKeyValue[0]);
            console.log(data);
            let keyPhrase = data.keyPhrase;
            console.log(keyPhrase);
            if (request.startsWith(keyPhrase)) {
                console.log("find");
                switch (data.type){
                    case "command":
                        console.log("command");
                        if (data.hasParam) {
                            let param = request.substring(data.keyPhrase.length + 1);
                            data.param.push(param);
                            console.log(data.param);
                        }
                        let serializedData = JSON.stringify(data);
                        return dataKeyValue[1](serializedData);
                    case "question":
                        console.log("question");
                        if (request === keyPhrase) {
                            return data.param;
                        }
                }

            }
        }
        return "команда не найдена";
    }
}