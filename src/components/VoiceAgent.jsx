import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function VoiceAgent() {
  const [listening, setListening] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [responseSpeech, setResponseSpeech] = useState('');
  const { token } = useAuth();
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
        className={`fab-voice ${listening ? 'listening' : processing ? 'processing' : speaking ? 'speaking' : ''}`}
      >
        <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
          {listening ? 'graphic_eq' : speaking ? 'volume_up' : 'mic'}
        </span>
      </button>

      {(listening || processing || responseSpeech) && (
        <div
          className="card"
          style={{
            position: 'fixed',
            bottom: '120px',
            left: '20px',
            right: '20px',
            maxWidth: '440px',
            margin: '0 auto',
            zIndex: 999,
            padding: '16px',
            borderRadius: '20px',
            boxShadow: 'var(--shadow-elevated)',
            border: '1px solid var(--surface-dim)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--surface-container)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>
              🤖
            </div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Cora — Assistente de Voz (Groq AI)
            </div>
            <button
              onClick={() => { setTranscript(''); setResponseSpeech(''); window.speechSynthesis.cancel(); }}
              style={{ marginLeft: 'auto', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--outline)' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>close</span>
            </button>
          </div>

          {transcript && (
            <div style={{ fontSize: '12px', color: 'var(--outline)', fontStyle: 'italic', marginBottom: '4px' }}>
              "{transcript}"
            </div>
          )}

          {processing && (
            <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '600' }}>
              Pensando com Groq AI...
            </div>
          )}

          {responseSpeech && (
            <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--on-surface)', marginTop: '4px' }}>
              {responseSpeech}
            </div>
          )}
        </div>
      )}
    </>
  );
}
