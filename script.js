const textArea = document.getElementById("text");
const voiceSelect = document.getElementById("voiceSelect");
const speakButton = document.getElementById("speakButton");
const synth = window.speechSynthesis;

let voices = [];

function populateVoiceList() {
    voices = synth.getVoices();
    voices.forEach(voice => {
        const option = document.createElement("option");
        option.value = voice.name;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

synth.addEventListener("voiceschanged", populateVoiceList);

speakButton.addEventListener("click", () => {
    const utterance = new SpeechSynthesisUtterance(textArea.value);
    const selectedVoice = voiceSelect.value;
    voices.forEach(voice => {
        if (voice.name === selectedVoice) {
            utterance.voice = voice;
        }
    });
    synth.speak(utterance);
});