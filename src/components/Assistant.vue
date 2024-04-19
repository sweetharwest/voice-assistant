<template>
    <div class="a-container">
        <div ref="block" class="message-container">
            <ul>
                <li v-for="(message, index) in messages" :key="index" :class="['message', index % 2 === 0 ? 'right' : 'left']">
                    <p>{{ message }}</p>
                </li>
            </ul>
        </div>
        <div v-if="keyboard" class="keyboard">
            <input v-model="keyboardText" placeholder="Введите команду" class="keyboard-input">
            <button @click="sendText" class="keyboard-send">
                <img src="./icons/send.png" alt="send">
            </button>
        </div>
        <div class="control-panel">
            <div class="control-panel-left">
                <button class="a-button" @click="stopSpeechSynthesis">
                    <img src="./icons/sound-off.png" alt="sound off">
                </button>
            </div>
            <div class="control-panel-center">
                <button @click="toggleSpeechRecognition" class="a-button">
                    <img v-if="listening" src="./icons/microphone-off.png" alt="microphone">
                    <img v-else src="./icons/microphone-on.png" alt="microphone">
                </button>
                <button class="a-button" @click="toggleKeyboard">
                    <img src="./icons/keyboard.png" alt="keyboard">
                </button>
            </div>
            <div class="control-panel-right">
                <button class="a-button" @click="showQuestions">
                    <img src="./icons/question.png" alt="question">
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import * as pr from "./process.js";
export default {
    data() {
        return {
            recognition: null,
            listening: false,
            recognizedText: '',
            answer: '',
            messages: [],
            keyboard: false,
            keyboardText: '',
            questions: ['Как отправить работу?',
                        'Что ты умеешь?',
                        'Нажми кнопку отправить',
                        'Запиши молоко в поле контрольная работа',
                        'Выбери 1 в вариант',
                        'Перечисли варианты в вариант'],
        };
    },
    mounted() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = false;
        this.recognition.lang = 'ru-RU';

        this.recognition.onresult = (event) => {
            this.recognizedText = event.results[0][0].transcript;
            this.addMessage(this.recognizedText);
            this.toggleSpeechRecognition();
            this.process(this.recognizedText);
        };
    },
    methods: {
        toggleSpeechRecognition() {
            if (this.listening) {
                this.recognition.stop();
                this.listening = false;
            } else {
                this.recognizedText = '';
                this.recognition.start();
                this.listening = true;
            }
        },
        toggleKeyboard() {
            this.keyboard = !this.keyboard;
        },
        stopSpeechSynthesis() {
            window.speechSynthesis.cancel();
        },
        process(input) {
            let answer = pr.process(input);
            this.addMessage(answer);
            this.speakResponse(answer);
        },
        speakResponse(response) {
            const synth = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(response);
            utterance.lang = "ru-RU";           // аббревиатура языка
            utterance.volume = 1;          // громкость
            utterance.rate = 0.8;            // скорость
            utterance.pitch = 0.3;
            const voices = speechSynthesis.getVoices();
            utterance.voice = voices[4]; //4 - men, 0 - women
            synth.speak(utterance);
        },
        addMessage(message) {
            this.messages.push(message);
            this.$nextTick(() => {
                this.$refs.block.scrollTop = this.$refs.block.scrollHeight;
            });
        },
        showQuestions() {
            this.addMessage('?');
            let output = 'Список возможных вопросов и команд:';
            for (let i = 0; i < this.questions.length; i++) {
                output += '\n\t' + '- ' + this.questions[i];
            }
            this.addMessage(output);
        },
        sendText() {
            this.addMessage(this.keyboardText);
            this.process(this.keyboardText);
            this.keyboardText = '';
        },
    },
};
</script>

<style>
.a-container {
    width: 600px;
    //height: 400px;
    right: 50px;
    bottom: 50px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
    position: fixed;
}

.keyboard {
    width: 600px;
    margin-top: 5px;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
}

.keyboard-input {
    font-family: Arial, sans-serif;
    font-size: 20px;
    width: 520px;
}

.keyboard-send {
    font-family: Arial, sans-serif;
    font-size: 20px;
    width: 74px;
    height: 30px;
    //padding: 30px;
}

.a-button {
    padding: 5px 20px;
    cursor: pointer;
}

.message-container {
    height: 200px; /* Высота блока */
    overflow-y: scroll; /* Включение вертикальной прокрутки */
    border: 1px solid #ccc; /* Добавление рамки для блока */
    padding: 10px;
}

.message {
    max-width: 400px;
    border-radius: 10px;
    background-color: #f2f2f2;
    margin-bottom: 10px;
    padding: 0 10px;
    white-space: pre-wrap;
}

ul {
    list-style-type: none;
    padding: 0;
}

li:hover {
    background-color: #f0f0f0;
}

.left {
    float: left;
    clear: both;
    background-color: #f2f2f2;
}

.right {
    float: right;
    clear: both;
    background-color: #04aa6d;
}

.question {
    background-image: url(./icons/question.png);
}

.control-panel {
    display: flex;
    justify-content: space-between;
}

.control-panel-left {
    align-self: flex-start;
}

.control-panel-center {
    display: flex;
}

.control-panel-center button {
    //margin: 0 10px;
}

.control-panel-right {
    align-self: flex-end;
}
</style>
