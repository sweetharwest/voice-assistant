export class SpeechSettings{
    utterance;

    constructor(response) {
        this.utterance =new SpeechSynthesisUtterance(response);
        this.utterance.lang = "ru-RU";           // аббревиатура языка
        this.utterance.volume = 1;          // громкость
        this.utterance.rate = 0.8;            // скорость
        this.utterance.pitch = 0.3;
        const voices = speechSynthesis.getVoices();
        this.utterance.voice = voices[4]; //4 - men, 0 - women
    }

    get() {
        return this.utterance;
    }
}