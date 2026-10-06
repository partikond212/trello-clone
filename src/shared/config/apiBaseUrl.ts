// Адрес бэкенда подставляется при сборке из переменной окружения VITE_API_URL
// (см. .env.example). Если переменная не задана — используем localhost
// для удобства локальной разработки, чтобы не ломать dev-режим.
export const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";
