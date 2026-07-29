export class VoiceEngine {
  constructor(onInterimResult, onStateChange) {
    this.onInterimResult = onInterimResult;
    this.onStateChange = onStateChange;
    this.isListening = false;

    if (this.isSupported()) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'pt-BR';
      this.recognition.continuous = false;
      this.recognition.interimResults = true;

      this.recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (interimTranscript && this.onInterimResult) {
          this.onInterimResult(interimTranscript);
        }

        if (finalTranscript && this.resolvePromise) {
          this.resolvePromise(finalTranscript);
          this.resolvePromise = null;
          this.stopListening();
        }
      };

      this.recognition.onstart = () => {
        this.isListening = true;
        if (this.onStateChange) this.onStateChange('listening');
      };

      this.recognition.onend = () => {
        if (this.isListening) {
           this.stopListening();
        }
      };

      this.recognition.onerror = (event) => {
        console.error('VoiceEngine error:', event.error);
        if (this.rejectPromise) {
           this.rejectPromise(event.error);
           this.rejectPromise = null;
        }
        this.stopListening();
      };
    }
  }

  isSupported() {
    return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
  }

  startListening() {
    return new Promise((resolve, reject) => {
      if (!this.isSupported()) {
        reject(new Error('Speech recognition not supported in this browser.'));
        return;
      }
      this.resolvePromise = resolve;
      this.rejectPromise = reject;
      
      try {
        this.recognition.start();
      } catch (e) {
        reject(e);
      }
    });
  }

  stopListening() {
    this.isListening = false;
    if (this.recognition) {
        this.recognition.stop();
    }
    if (this.onStateChange) this.onStateChange('idle');
  }

  speak(text) {
    if (!('speechSynthesis' in window)) return;
    
    if (this.onStateChange) this.onStateChange('speaking');
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 1;
    utterance.pitch = 1;
    
    utterance.onend = () => {
      if (this.onStateChange) this.onStateChange('idle');
    };
    
    window.speechSynthesis.speak(utterance);
  }
}
