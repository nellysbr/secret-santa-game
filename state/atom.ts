import { atom } from 'recoil';

export const participantList = atom<string[]>({
  key: 'participantList',
  default: [''],
});

export const erroState = atom<string>({
  key: 'erroState',
  default: '',
});
