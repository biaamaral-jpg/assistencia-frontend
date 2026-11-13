// A URL do backend deve ser configurada por variável de ambiente.
// Se não existir, usa a API pública do projeto para evitar 404 ao chamar uma rota do Vite local.
const defaultApiUrl = 'https://infotech-9wu3.onrender.com';

const apiUrl = (import.meta.env?.VITE_API_URL ?? '').trim() || defaultApiUrl;

export const API_URL = apiUrl.replace(/\/+$/, '');