class TTS {
  constructor(text) {
    this.utter = new SpeechSynthesisUtterance();
    this.voices = [];
    this.speakText = new SpeechSynthesisUtterance(text);
    this.isEnded = true;
    this.paused;
    speechSynthesis.addEventListener('voiceschanged', this.populatedVoiceList);
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
      console.error('Already speaking');
      return;
    }

    this.speakText.addEventListener('error', (e) => {
      console.error('Something is not working.Please try again');
    });

    // Error while speaking
    this.speakText.addEventListener('end', (e) => {
      this.isEnded = true;
    });

    this.speakText.voice = this.voices[0];
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
}
