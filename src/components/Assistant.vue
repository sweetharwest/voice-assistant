<template>
    <div class="assistant-container">
        <div class="assistant-header">
            Голосовой помощник
        </div>
        <div ref="messageContainer" class="message-container">
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
                <button class="assistant-button" @click="stopSpeechSynthesis">
                    <img src="./icons/sound-off.png" alt="sound off">
                </button>
            </div>
            <div class="control-panel-center">
                <button @click="toggleSpeechRecognition" class="assistant-button">
                    <img v-if="listening" src="./icons/microphone-off.png" alt="microphone">
                    <img v-else src="./icons/microphone-on.png" alt="microphone">
                </button>
                <button class="assistant-button" @click="toggleKeyboard">
                    <img src="./icons/keyboard.png" alt="keyboard">
                </button>
            </div>
            <div class="control-panel-right">
                <button class="assistant-button" @click="showInfo">
                    <img src="./icons/question.png" alt="question">
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import {SpeechSettings} from "@/components/speechSettings.js";
import {Process} from "@/components/process.js";
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
            Process: null,
        };
    },
    props: {
        commandData: Map,
        infoData: JSON,
    },
    mounted() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = false;
        this.recognition.lang = 'ru-RU';

        this.Process = new Process(this.commandData);

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
        addMessage(message) {
            this.messages.push(message);
            this.$nextTick(() => {
                this.$refs.messageContainer.scrollTop = this.$refs.messageContainer.scrollHeight;
            });
        },
        showInfo() {
            this.addMessage('?');
            const infoData = JSON.parse(this.infoData);
            let output = 'Список возможных вопросов и команд:';
            for (let i = 0; i < infoData.info.length; i++) {
                output += '\n\t' + '- ' + infoData.info[i];
            }
            this.addMessage(output);
        },
        sendText() {
            this.addMessage(this.keyboardText);
            this.process(this.keyboardText);
            this.keyboardText = '';
        },
        process(input) {
            this.answer = this.Process.do(input);
            this.addMessage(this.answer);
            this.speakResponse(this.answer);
        },
        speakResponse(response) {
            const synth = window.speechSynthesis;
            synth.speak(new SpeechSettings(response).get());
        },
    },
};
</script>

<style>
.assistant-container {
    width: 600px;
    right: 50px;
    bottom: 50px;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
    position: fixed;
}

.assistant-header {
    width: 600px;
    font-family: Arial, sans-serif;
    font-size: 24px;
    text-align: center;
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
}

.assistant-button {
    padding: 5px 20px;
    cursor: pointer;
}

.message-container {
    height: 200px;
    overflow-y: scroll;
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 5px;
    margin-top: 5px;
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

.control-panel-right {
    align-self: flex-end;
}
</style>
