import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function VoiceAgent() {
  const [listening, setListening] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [responseSpeech, setResponseSpeech] = useState('');
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

  const startListening = () => {
    if (!isSupported) {
      alert('Reconhecimento de voz não suportado neste navegador.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.interimResults = true;
    recognition.continuous = false;

    setListening(true);
    setTranscript('Ouvindo...');
    setResponseSpeech('');

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const text = event.results[current][0].transcript;
      setTranscript(text);

      if (event.results[current].isFinal) {
        processTranscript(text);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech error:', event.error);
      setListening(false);
      setTranscript('Não entendi, tente novamente.');
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  };

  const processTranscript = async (text) => {
    setProcessing(true);
    try {
      const res = await fetch('/api/ai/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ transcript: text, currentPage: window.location.pathname })
      });

      const data = await res.json();
      setProcessing(false);

      if (data.speech) {
        setResponseSpeech(data.speech);
        speakText(data.speech);
      }

      if (data.action) {
        handleAction(data.action);
      }
    } catch (err) {
      console.error('Error processing voice:', err);
      setProcessing(false);
      const fallback = 'Desculpe, tive um problema ao conectar com a IA.';
      setResponseSpeech(fallback);
      speakText(fallback);
    }
  };

  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.0;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleAction = (action) => {
    if (action.type === 'navegar' && action.params?.pagina) {
      navigate(action.params.pagina);
    } else if (action.type === 'reportar_problema') {
      navigate('/reportar-detalhes', { state: { category: action.params?.categoria } });
    } else if (action.type === 'consultar_relatos') {
      navigate('/meus-relatos');
    }
  };

  return (
    <>
      <button
        onClick={startListening}
        aria-label="Assistente de Voz (Cora)"
        className={`fixed right-5 bottom-20 w-14 h-14 rounded-full bg-[#1f108e] text-white shadow-lg flex items-center justify-center z-50 transition-all transform hover:scale-110 active:scale-95 ${
          listening ? 'bg-red-600 animate-pulse ring-4 ring-red-300' : speaking ? 'bg-emerald-600' : ''
        }`}
      >
        <span className="material-symbols-outlined text-2xl">
          {listening ? 'graphic_eq' : speaking ? 'volume_up' : 'mic'}
        </span>
      </button>

      {(listening || processing || responseSpeech) && (
        <div className="fixed bottom-36 left-4 right-4 max-w-md mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 border border-indigo-100 z-50 animate-slide-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
              🤖
            </div>
            <div className="text-xs font-semibold text-indigo-900 uppercase tracking-wider">
              Cora — Assistente de Voz
            </div>
            <button
              onClick={() => { setTranscript(''); setResponseSpeech(''); window.speechSynthesis.cancel(); }}
              className="ml-auto text-slate-400 hover:text-slate-600"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>

          {transcript && (
            <div className="text-xs text-slate-500 italic mb-1">
              " {transcript} "
            </div>
          )}

          {processing && (
            <div className="text-xs text-indigo-600 font-medium animate-pulse flex items-center gap-1">
              <span className="material-symbols-outlined text-sm animate-spin">sync</span>
              Pensando com Groq AI...
            </div>
          )}

          {responseSpeech && (
            <div className="text-sm font-semibold text-slate-900 mt-1">
              {responseSpeech}
            </div>
          )}
        </div>
      )}
    </>
  );
}
