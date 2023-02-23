import { atom } from 'recoil';

export const participantList = atom<string[]>({
  key: 'participantList',
  default: [''],
});

export const resultadoAmigoSecreto = atom<Map<string, string>>({
  key: 'resultadoAmigoSecreto',
  default: new Map(),
});

export const erroState = atom<string>({
  key: 'erroState',
  default: '',
});
