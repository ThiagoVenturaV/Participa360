import { api } from '../api.js';
import store from '../store.js';

export async function parseIntent(transcript, currentPage) {
  const response = await api.post('/ai/process', {
    transcript,
    currentPage
  });
  return response; // { speech, action }
}
