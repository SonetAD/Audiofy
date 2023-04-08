class TTS {
  static selectedVoice = JSON.parse(localStorage.getItem("selectedVoice"));
  constructor(text) {
    this.utter = new SpeechSynthesisUtterance();
    this.speakText = new SpeechSynthesisUtterance(text);
    this.isEnded = true;
    this.paused;
  }

  populatedVoiceList() {
    this.voices = this.getVoices();
    console.log(this.voices);
    this.voices.forEach((voice) => {
      // const option = document.createElement('option');
      // option.textContent = `${voice.name}(${voice.lang})`;
      // option.setAttribute('data-lang', voice.lang);
      // option.setAttribute('data-name', voice.name);
      // selectVoices.append(option);
    });
  }

  speak() {
    this.isEnded = false;
    if (speechSynthesis.speaking) {
      console.error("Already speaking");
      return;
    }

    this.speakText.addEventListener("error", (e) => {
      console.error("Something is not working.Please try again");
    });

    // Error while speaking
    this.speakText.addEventListener("end", (e) => {
      this.isEnded = true;
    });

    let voiceList = speechSynthesis.getVoices();
    if (!voiceList) {
      speechSynthesis.addEventListener("voiceschanged", () => {
        voiceList = this.getVoices();
      });
    }
    voiceList.forEach((v) => {
      if (
        v.lang === TTS.selectedVoice.lang &&
        v.name === TTS.selectedVoice.name &&
        v.voiceURI === TTS.selectedVoice.voiceURI
      ) {
        this.speakText.voice = v;
      }
    });
    this.speakText.rate = 1;
    this.speakText.pitch = 1;
    speechSynthesis.speak(this.speakText);
  }

  pause() {
    speechSynthesis.pause();
    this.paused = speechSynthesis.paused;
  }
  resume() {
    speechSynthesis.resume();
    this.paused = speechSynthesis.paused;
  }

  stop() {
    speechSynthesis.cancel();
  }
}

if (!TTS.selectedVoice) {
  let voices = speechSynthesis.getVoices();
  if (!voices) {
    speechSynthesis.addEventListener("voiceschanged", () => {
      voices = this.getVoices();
    });
  }
  localStorage.setItem("selectedVoice", voiceJsonConverter(voices[0]));
  TTS.selectedVoice = voices[0];
}

function voiceJsonConverter(voice) {
  const modVoice = {};
  for (v in voice) {
    modVoice[v] = voice[v];
  }
  console.log(JSON.stringify(modVoice));
  return JSON.stringify(modVoice);
}
