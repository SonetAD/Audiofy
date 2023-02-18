const tts = (text) => {
  const synth = new SpeechSynthesisUtterance();
  let voices = [];

  const selectVoices = document.getElementById('voice-select');

  function populatedVoiceList(e) {
    voices = this.getVoices();
    voices.forEach((voice) => {
      const option = document.createElement('option');
      option.textContent = `${voice.name}(${voice.lang})`;
      option.setAttribute('data-lang', voice.lang);
      option.setAttribute('data-name', voice.name);
      selectVoices.append(option);
    });

    e.preventDefault();
  }

  function speak() {
    if (speechSynthesis.speaking) {
      console.error('Already speaking');
      return;
    }

    const speakText = new SpeechSynthesisUtterance(text);

    speakText.addEventListener('error', (e) => {
      console.error('Something is not working.Please try again');
    });

    speakText.addEventListener('end', (e) => {
      console.log('End speaking');
    });
    speakText.voice = voices[0];
    speakText.rate = 1;
    speakText.pitch = 1;
    speechSynthesis.speak(speakText);
  }
  speechSynthesis.addEventListener('voiceschanged', populatedVoiceList);
  speak();
};
