class TTS {
  static selectedVoice = JSON.parse(localStorage.getItem("selectedVoice"));
  constructor(text) {
    this.utter = new SpeechSynthesisUtterance();
    this.speakText = new SpeechSynthesisUtterance(text);
    this.isEnded = true;
    this.paused;
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

let voices = speechSynthesis.getVoices();
if (!voices) {
  speechSynthesis.addEventListener("voiceschanged", () => {
    voices = this.getVoices();
  });
}
if (!TTS.selectedVoice) {
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

const changeVoiceBtn = document.getElementById("changeVoiceBtn");
changeVoiceBtn.addEventListener("click", (e) => {
  const voiceSelectedBox = document.querySelector("#voice-select");
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.textContent = `${voice.name}(${voice.lang})`;
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelectedBox.append(option);
  });
  document.addEventListener("click", (e) => {
    if (e.target.className.includes("saveVoice")) {
      const chosenVoice = voiceSelectedBox.value;
      voices.forEach((v) => {
        const modedVoice = `${v.name}(${v.lang})`;
        if (modedVoice === chosenVoice) {
          localStorage.setItem("selectedVoice", voiceJsonConverter(v));
        }
      });
      location.href = "index.html";
    }
    e.preventDefault();
  });
  e.preventDefault();
});
