import { useRecoilValue } from 'recoil';
import { erroState } from '../state/atom';

export const useErrorMessage = () => {
  const mensagem = useRecoilValue(erroState);
  return mensagem;
};
