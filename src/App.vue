<script setup>
    import Assistant from './components/Assistant.vue'
</script>

<template>
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
        <Assistant :commandData="commandData" :infoData="data.serializedInfoData"/>
    </main>
</template>

<script>
import * as data from "./components/data.js"
export default {
    data() {
        return {
            commandData: new Map([
                [data.serializedCommandData1, this.click],
                [data.serializedCommandData2, this.write],
                [data.serializedCommandData3, this.choose],
                [data.serializedCommandData4, "none"],
                [data.serializedCommandData5, "none"],
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
