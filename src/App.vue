<script setup>
    import Assistant from './components/Assistant.vue'
</script>

<template>
    <header>
    </header>

    <main>
        <div>
            <p>контрольная работа</p>
            <input id="testInput" type="text" placeholder="Введите текст" />
            <button id="testButton" @click="testButtonDo">отправить</button>
        </div>
        <div>
            <p>вариант</p>
            <select name="testSelect" id="testSelect">
                <option value="">Выберите вариант</option>
                <option value="1">первый</option>
                <option value="2">второй</option>
                <option value="3">третий</option>
            </select>
        </div>
        <Assistant :questions="questions" :commands="commands" :data="data9"/>
    </main>
</template>

<script>
import {Question} from "@/components/question.js";
import {Command} from "@/components/command.js";
import * as data from "./components/data.js"
export default {
    data() {
        return {
            questions: [
                new Question('как отправить работу', 'Для того чтобы отправить работу нужно выбрать название контрольной, вариант работы и задание. После этого прикрепить файлы и нажать кнопку отправить.'),
                new Question('что ты умеешь', 'Я умею записывать, отправлять, перечислять и выбирать')
            ],
            commands: [
                new Command('нажми кнопку отправить', this.click, 'none'),
                new Command('запиши', this.write, 'write'),
                new Command('выбери вариант', this.choose, 'choose')
            ],
            data9: new Map([
                [data.serializedData1, this.click],
                [data.serializedData2, this.write],
                [data.serializedData3, this.choose],
                [data.serializedData4, "none"],
                [data.serializedData5, "none"],
            ])
        }
    },
    methods: {
        click() {
            return "Нажата кнопка отправить";
        },
        write(serializedData) {
            const data = JSON.parse(serializedData);
            const text = data.param.pop();
            let elementDOM = document.getElementById('testInput');
            elementDOM.value = text;
            return "текст записан";
        },
        choose(serializedData) {
            const data = JSON.parse(serializedData);
            const option = data.param.pop();
            let elementDOM = document.getElementById('testSelect');
            for (let i = 0; i < elementDOM.length; i++) {
                if (elementDOM[i].value === option) {
                    elementDOM[i].selected = true;
                    return "Команда выполнена";
                }
            }
            return option + " не найден";
        }
    }
}
</script>

<style>
</style>
