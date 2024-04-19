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
        <Assistant />
    </main>
</template>

<script>
export default {
    methods: {
        testButtonDo() {
            alert("Нажата кнопка отправить");
        }
    }
}
</script>

<style>
</style>
