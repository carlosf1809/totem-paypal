// src/utils/storage.ts
import localforage from "localforage";

const STORAGE_KEY = "jornadas_completas";

export const salvarNovaJornada = async (jornada: any) => {
  const existentes = (await localforage.getItem<any[]>(STORAGE_KEY)) || [];
  existentes.push({ ...jornada, data: new Date().toISOString() });
  await localforage.setItem(STORAGE_KEY, existentes);
};

export const obterTodasJornadas = async () => {
  return (await localforage.getItem<any[]>(STORAGE_KEY)) || [];
};

export const limparJornadas = async () => {
  await localforage.removeItem(STORAGE_KEY);
};
