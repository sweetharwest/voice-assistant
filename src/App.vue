<script setup>
    import Assistant from './components/Assistant.vue'
</script>

<template>
    <header>
    </header>

    <main>
        <input id="testInput" type="text" placeholder="Введите текст" />
        <button id="testButton" @click="testButtonDo">отправить</button>
        <select name="testSelect" id="testSelect">
            <option value="">--Please choose an option--</option>
            <option value="1">первый</option>
            <option value="2">второй</option>
            <option value="3">третий</option>
        </select>
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
